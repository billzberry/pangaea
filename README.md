**Pangaea Take Home Assignment**
----
    For this challenge we'll be creating a HTTP notification system. A server (or set of servers) will keep track of topics ->
    subscribers where a topic is a string and a subscriber is an HTTP endpoint. When a message is published on a topic, it
    should be forwarded to all subscriber endpoints.

* **URL**

    ```
        /publish/:id - eg. http://127.0.0.1:8000/publish/topic1
        /subscribe/:id - eg. http://127.0.0.1:8000/subscribe/topic1
    ```

* **Method:**

  `POST`

* **Data Params for Subscribe**

  ```
    {
        "url": "http://localhost:9000/test1"
    }
  ```

* **Data Params for Publish**

  ```
    {
        "message": "Hello"
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Object`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `Object`

  OR

  * **Code:** 502 BAD GATEWAY <br />
    **Content:** `{ status: 'Bad Gateway', message: 'Something went wrong' }`

* **Sample Call:**

  ```
    curl -X POST -H "Content-Type: application/json" -d '{ "url": "http://localhost:9000/test1"}' http://localhost:8000/subscribe/topic1
    curl -X POST -H "Content-Type: application/json" -d '{ "url": "http://localhost:9000/test2"}' http://localhost:8000/subscribe/topic1
    curl -X POST -H "Content-Type: application/json" -d '{"message": "hello"}' http://localhost:8000/publish/topic1
  ```