# Responsive Web Design Ćwiczenia 3: Bazowa Strona Główna (One-Page Hub)

**Struktura plików:** `index.html`, `style.css` (opcjonalnie dedykowany arkusz stylów), ewentualne obrazki i inne elementy w folderze `/img` lub `/src/...`

---

## 1. Cel Zadania

Celem pierwszego etapu jest utworzenie bazowej strony głównej serwisu dla podmiotu określonego w Karcie Projektu. Witryna na tym etapie funkcjonuje jako serwis jednoplanowy (**One-Page Hub**) i stanowi fundament pod dalszą, modułową rozbudowę.

Zadanie koncentruje się wyłącznie na prezentacji profilu działalności, kluczowej ofercie oraz mechanizmie kontaktu. Implementacja modułów sklepu oraz bloga zostanie zrealizowana w kolejnych etapach semestralnych.

---

## 2. Wymagana Zawartość Merytoryczna i Struktura Strony

Plik `index.html` musi zawierać następujące sekcje ułożone w logicznym porządku:

1. **Pasek Nawigacyjny (`<header>`, `<nav>`):**
    * Identyfikator marki (nazwa podmiotu w formie tekstowej lub graficznej).
    * Element `navbar-toggler` umożliwiający zwijanie nawigacji na ekranach o ograniczonej szerokości.
    * Menu odnośników kotwiczących (`#o-nas`, `#oferta`, `#kontakt`), realizujących płynne przewijanie do poszczególnych partii strony.


2. **Sekcja Wiodąca (`<section id="hero">`):**
    * Główny nagłówek strony (`<h1>`) prezentujący nazwę podmiotu oraz hasło przewodnie.
    * Podtytuł charakteryzujący obszar działalności (2–3 zdania).
    * Przycisk wezwania do działania (Call to Action) kierujący do sekcji kontaktu.


3. **Sekcja O Firmie / Inicjatywie (`<section id="o-nas">`):**
    * Nagłówek sekcji (`<h2>`).
    * Zestawienie dwukolumnowe: syntetyczny opis profilu podmiotu i jego misji oraz powiązana tematycznie grafika.


4. **Sekcja Kluczowej Oferty (`<section id="oferta">`):**
    * Prezentacja trzech głównych obszarów działalności/usług określonych w briefie projektowym.
    * Prezentacja w formie zestawienia trzech kart informacyjnych (`card`).


5. **Sekcja Kontaktowa z Formularzem (`<section id="kontakt">`):**
    * Wykaz danych teleadresowych (adres, adres poczty elektronicznej, telefon).
    * Formularz zapytania ofertowego zawierający:
    * Pole imienia i nazwiska,
    * Pole adresu e-mail,
    * Listę wyboru tematu wiadomości,
    * Pole wielowierszowe na treść zapytania,
    * Przycisk wysłania formularza.




6. **Stopka Serwisu (`<footer>`):**
    * Nota prawna z oznaczeniem praw autorskich i bieżącym rokiem.
    * Dane identyfikacyjne podmiotu.



---

## 3. Organizacja Kodu CSS

Wszelkie reguły stylistyczne wykraczające poza klasy dostarczane przez framework Bootstrap 5 podlegają następującym regułom organizacji:

1. **Zewnętrzny arkusz stylów (`style.css`):**
* Wszystkie niestandardowe klasy, modyfikacje kolorystyczne wynikające z Księgi Stylu, nadpisania marginesów oraz reguły typograficzne muszą znajdować się w zewnętrznym pliku `style.css`, dołączonym w sekcji `<head>` dokumentu za arkuszem stylów Bootstrapa.


2. **Dopuszczalność stylów liniowych (inline styles):**
* Stosowanie atrybutu `style="..."` bezpośrednio w kodzie HTML dopuszczalne jest wyłącznie dla mikrostylów specyficznych dla pojedynczego elementu (np. dynamicznie generowane przesunięcie, precyzyjne tło graficzne sekcji Hero). Pełne deklaracje reguł muszą być zdefiniowane w pliku `style.css`.