# MadimedApp pl
<h4>Language: <a href="#en">EN</a></h4>

<h2>Opis</h2>
<p>Ta aplikacja została napisana jako praca dyplomowa (praca inżynierska).</p>
<p>Aplikacja internetowa przeznaczona dla przychodni lekarskich. Ma ona pomóc w zmniejszeniu kolejek do
rejestracji oraz zmniejszyć czas oczekiwania do odpowiedniego specjalisty. Powinna ułatwić
pacjentom sam proces rejestracji oraz zmniejszyć obciążenie pracy recepcji przychodni.
Aplikacja jest w pełni darmowa i umożliwia pacjentom łatwe zarejestrowanie się online na
wizytę. Została stworzona przy użyciu technologii <b>Angular</b>, <b>.NET Core</b> oraz bazy <b>SQLite</b>.
W aplikacji zostały zaimplementowane takie funkcjonalności jak możliwość wyboru lekarza
i terminu wizyty, a także możliwość anulowania wizyty przez pacjentów. Lekarze z kolei
będą mieć możliwość przeglądanie historii wizyt pacjenta i na bieżąco uzupełniać ich
dokumentację.</p>

<p>Strona klienta napisana w Angularze w języku TypeScript. Dzięki użyciu arkuszy stylów CSS/SCSS wygląd, przejrzystość i użyteczność strony jest przyjemna i łatwa w obsłudze.</p>
<p>Api napisane w języku C# z użyciem .NET Core. Baza danych SQLite.
</br>Dodatkowo na potrzeby aplikacji zostały użyte dodatki takie jak: 
  <ul>
    <li><b>Entity Framework</b> pomocne przy zarządzaniu danymi oraz łatwym mapowaniu
      obiektów aplikacji na tabele bazy danych,</li>
    <li>system logowania <b>AspNet IdentityRole</b> zapewniający bezpieczeństwo danych
      pacjentów.</li>
  </ul>
</p>
<a href="#pres">Graficzna prezentacja aplikacji.</a>

## Narzędzia i technologie użyte w projekcie:
- Visual Studio Code (środowisko)
<p>Front-End</p>
<ul> 
  <li>Angular 12</li>
  <li>TypeScript 4</li>
  <li>HTML 5</li>
  <li>SCSS</li>
</ul>
<p>Back-End</p>
<ul>
  <li>.NET 7</li>
  <li>C#</li>
  <li>EntityFrameworkCore 7</li>
  <li>AspNetCore Identity EntityFrameworkCore 7</li>
  <li>AspNetCore Authentication JwtBearer 7</li>
  <li>AutoMapper 12</li>
</ul>

<h2>Licencja</h2>
<p>Ten projekt jest objęty licencją "przeglądową", co oznacza, że zachowuję pełne prawa autorskie do kodu, ale jednocześnie pozwalając na jego przeglądanie i korzystanie przez innych. Więcej informacji na temat licencji znajdziesz w pliku LICENSE.md.</p>

<h2>Autorzy</h2>
<p>
    <ul><li>Szymon Markulak (jedyny autor tej aplikacji).</li></ul>
</p>

<h2>Kontakt</h2>
<p>Email: <a href="mailto:markulaks17@gmail.com">markulaks17@gmail.com</a></p>
</br></br>

<h1 id="en"> MadimedApp en</h1>
<h2>Description</h2>
<p>This website is my final project for studies (engineering work).</p>
<p>A web application for medical clinics. It aims to reduce the queues for registration and decrease the waiting time for
the appropriate specialist. It should also simplify the registration process for patients and
reduce the workload of the clinic receptionist. The application is fully free and allows patients
to easily register online for a visit. It was created using Angular, .NET Core and SQLite
technology. The application has implemented functionality such as the ability to choose a
doctor and appointment time, as well as the ability for patients to cancel appointments.
Doctors, in turn, will have the ability to review the patient's visit history and continuously
update their documentation.</p>

<p>A client-side web application built with Angular and TypeScript. Thanks to the use of CSS/SCSS stylesheets, the appearance, clarity, and usability of the site are pleasant and easy to use.</p>
<p>he API is written in C# using .NET Core, with a SQLite database.
</br>Additionally, the following add-ons were used for the application: 
  <ul>
    <li>Entity Framework, which is helpful in managing data and easy mapping of application objects to database tables,</li>
    <li>AspNet IdentityRole login system, which ensures patient data security.</li>
  </ul>
</p>
<a href="#pres">Graphical presentation of the app.</a>

## Tools & technologies used in the project:
- Visual Studio Code (environment)
<p>Front-End</p>
<ul> 
  <li>Angular 12</li>
  <li>TypeScript 4</li>
  <li>HTML 5</li>
  <li>SCSS</li>
</ul>
<p>Back-End</p>
<ul>
  <li>.NET 7</li>
  <li>C#</li>
  <li>EntityFrameworkCore 7</li>
  <li>AspNetCore Identity EntityFrameworkCore 7</li>
  <li>AspNetCore Authentication JwtBearer 7</li>
  <li>AutoMapper 12</li>
</ul>
 
<h2>License</h2>
<p>This project is licensed under a "permissive" license, which means that I retain full copyright ownership of the code, while allowing others to view and use it. For more information about the license, please refer to the LICENSE.md file.</p>

<h2>Authors</h2>
<p>
    <ul><li>Szymon Markulak (sole author of this app).</li></ul>
</p>

<h2>Contact</h2>
<p>Email: <a href="mailto:markulaks17@gmail.com">markulaks17@gmail.com</a></p>
</br>

<h1 id="pres">Graficzna prezentacja aplikacji </br>(Graphical presentation of the application)</h1>
</br>
<p>Panel rejestracyjny (registration panel)</p>
<img src='/README-assets/MadimedApp_Rejestracja.gif'>
</br>
<p>Panel pacjenta (patient panel)</p>
<img src='/README-assets/MadimedApp_Pacjent.gif'>
</br>
<p>Panel lekarza (doctor panel)</p>
<img src='/README-assets/MadimedApp_Lekarz.gif'>
</br>
<p>Panel administratora (admin panel)</p>
<img src='/README-assets/MadimedApp_Admin.gif'>

