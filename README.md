**Martin Kassar inlämningsuppgift 1**
----
* Hur används HTTP-protokollet när du surfar in på en websida? Beskriv vilken metod, path, URI, response code och body som skickas in och svarar. Om du har svårt att bestämma dig för en url, ta ex. http://www.smp.se/kultur-noje/ 

```
Man använder en GET metod för att få en response code från länken, där pathen är "kultur-noje". Det man får som response code är HTML
```



* "http://localhost:3000/users?username=something" är en URI, beskriv vilka delar den består av och vad de kallas.

```
http: är schemat
"localhost:300" är authority
"/users" är path
?username=something är query

```


* Beskriv HTTP-protokollets vanligaste metoder och vad de gör.
 ```
GET: GET metoden skickar en request att få en kopia av en resurs. GET requets borde endast ta emot data.
POST: POST metoden används för att skicka in ett nytt objekt.
PUT: PUT metoden ersätter ett existeraned objekt som man kan identifiera med ett unikt ID, annars skapar den ett nytt objekt istället.
DELETE: DELETE metoden raderar objektet du speciferar i ditt anrop.
PATCH: PATCH metoden används för att modifiera ett existerande objekt.
 ```

 
  * På vilka tre sätt kan man skicka in parametrar i en HTTP-request? Ge exempel med curl.
 ```
Med path: curl http://api.softhouse.rocks/users
Med en path till en route till en endpoint med ett ID: http://api.softhouse.rocks/users/1
Med query: curl http://api.softhouse.rocks/users?page=2

 ```
