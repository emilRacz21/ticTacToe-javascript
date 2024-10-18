//deklaracja zmiennych do operacji na liczbach.
let firstNum = "",
  secondNum = "",
  result;

//flaga sprawdzająca czy operator dodawania, odejmowania itd został już wybrany.
let operatorSelected = false;

//pobieranie elementów z strony html
let tablice = document.querySelectorAll("td");
let previousNumber = document.getElementById("second-num");
let firstNumber = document.getElementById("first-num");
let operator = document.getElementById("operator");
let HistoryText = document.getElementById("result-text");
let newElementHistory;
let DeleteLastElHis = document.getElementById("clear-history");
let pElement;
let showHistory = document.getElementById("show-history");
let historyTable = document.getElementById("history-table");
let closeHistory = document.getElementById("close-history");
showHistory.addEventListener("click", () => {
  historyTable.classList.toggle("active");
});
closeHistory.addEventListener("click", () => {
  historyTable.classList.toggle("active");
});
//nasłuch na elementy tablicy (cyfry , dodawania, odejmowanie, znak równości).
tablice.forEach((e) => {
  e.addEventListener("click", operations);
});

//funkcja obsługująca konwersję procentów na liczbę zmiennoprzecinkową.
convertPercentToFloat = (num) => {
  if (num.includes("%")) {
    num = num.slice(0, -1);
    return parseFloat(num) / 100;
  }
  return parseFloat(num);
};

//wykonanie funkcji do obslugi kliknięć na elementy tablicy.
function operations(e) {
  //wartość klikniętego elementu.
  let value = e.target.textContent;

  //sprawdza czy kliknięta wartość jest cyfrą, procentem (tylko jeśli nie ma już procentu) lub kropką (tylko jeśli nie ma już kropki).
  if (
    (value >= "0" && value <= "9") ||
    (value == "%" && !firstNum.includes("%")) ||
    (value == "." && !firstNum.includes("."))
  ) {
    if (firstNum == "" && value == ".") {
      firstNumber.textContent = "0";
    }
    if (firstNum == "" && value == "%") {
      return;
    }

    pElement = document.createElement("p");
    pElement.classList.add("active");
    pElement.append(value);
    firstNumber.append(pElement);
    firstNum = firstNumber.textContent;
  }

  //sprawdza, czy kliknięto operator (i upewnia się, że operator nie został jeszcze wybrany).
  if (!operatorSelected && ["+", "-", "x", "÷"].includes(value)) {
    previousNumber.classList.add("active-operator");
    operator.classList.add("active-operator");
    if (firstNum != "") {
      secondNum = firstNum;
      firstNum = "";
      firstNumber.textContent = "";
      operator.innerHTML = value;
      previousNumber.innerHTML = secondNum;
      operatorSelected = true;
    }
  }

  //sprawdza, czy kliknięto przycisk do potęgowania (x²).
  if (value == "x²") {
    //jeśli pierwszy numer zawiera procent, nie wykonuj operacji.
    if (firstNum.includes("%")) {
      return;
    } else {
      //oblicza kwadrat pierwszego numeru i wyświetla wynik.
      firstNum = Math.pow(firstNum, 2).toString();
      firstNumber.textContent = firstNum;
    }
  }

  //sprawdza, czy kliknięto przycisk do usunięcia danych.
  if (value == "del") {
    firstNumber.classList.remove("active-operator");
    previousNumber.classList.remove("active-operator");
    operator.classList.remove("active-operator");
    previousNumber.classList.add("delete");
    firstNumber.classList.add("delete");
    operator.classList.add("delete");
    previousNumber.addEventListener(
      "animationend",
      () => {
        secondNum = "";
        firstNum = "";
        firstNumber.innerHTML = "";
        previousNumber.innerHTML = "";
        operator.innerHTML = "";
        operatorSelected = false;
        previousNumber.classList.remove("delete");
        firstNumber.classList.remove("delete");
        operator.classList.remove("delete");
      },
      { once: true }
    );
  }

  //sprawdza, czy pierwszy numer jest nieskończonością.
  if (firstNum == Infinity) {
    firstNumber.textContent = "za duza wartosc";
    secondNum = "";
    firstNum = "";
    previousNumber.innerHTML = "";
    operator.innerHTML = "";
    return;
  }

  //sprawdza, czy kliknięto przycisk "=" (równa się).
  if (value == "=") {
    firstNumber.classList.add("active-operator");
    previousNumber.classList.remove("active-operator");
    operator.classList.remove("active-operator");
    operatorSelected = false;
    if (firstNum.includes("%") || secondNum.includes("%")) {
      firstNum = convertPercentToFloat(firstNum);
      secondNum = convertPercentToFloat(secondNum);
    }
    if (firstNum == "0" && operator.innerHTML == "÷") {
      firstNumber.innerHTML = "dziel przez 0";
      previousNumber.innerHTML = "";
      operator.innerHTML = "";
      return 0;
    }

    //wykonanie operacji na podstawie wybranego operatora.
    if (secondNum != "" && firstNum != "") {
      switch (operator.innerHTML) {
        case "+":
          result = (parseFloat(firstNum) + parseFloat(secondNum)).toFixed(2);
          break;
        case "x":
          result = (parseFloat(firstNum) * parseFloat(secondNum)).toFixed(2);
          break;
        case "÷":
          result = (parseFloat(secondNum) / parseFloat(firstNum)).toFixed(2);
          break;
        case "-":
          result = (parseFloat(secondNum) - parseFloat(firstNum)).toFixed(2);
          break;
      }

      //wyświetl wynik i zapisz operacji w historii.
      firstNumber.textContent = result;
      newElementHistory = document.createElement("div");
      newElementHistory.innerHTML =
        secondNum + " " + operator.innerHTML + " " + firstNum + " = " + result;
      HistoryText.append(newElementHistory);
      firstNum = result;
      secondNum = "";
      operator.innerHTML = "";
      previousNumber.innerHTML = "";
    } else {
      console.log("error");
      firstNumber.textContent = "";
    }
  }

  //sprawdza czy kliknięto przycisk "c" - czyści ostatni dodany znak.
  if (value == "c") {
    //pElement.classList.add("delete");
    if (result != "") firstNum = "";
    if (firstNumber.textContent == "") {
      firstNumber.textContent = "";
    } else {
      firstNumber.lastChild.classList.add("delete");
      firstNumber.addEventListener(
        "animationend",
        () => {
          firstNum = firstNum.slice(0, -1);
          firstNumber.lastChild.remove();
        },
        { once: true }
      );
    }
  }
}

//wydarzenie obsługujące usuwanie ostatniego elementu (dziecka) należącego do div o id = clearHistory.
DeleteLastElHis.addEventListener("click", () => {
  //sprawdzenie czy  historyText nie jest puste.
  if (HistoryText.innerHTML != "") {
    //Usuwanie ostatnego dodanego elementu należącego do parent o id = clearHistory.
    HistoryText.lastChild.remove();
  }
});
