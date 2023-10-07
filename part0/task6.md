sequenceDiagram
    participant browser
    participant server

    Note right of browser: Form submit event. Send user input to server. Browser sends only one request to the server.
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: Server does not ask for a redirect, the browser stays on the same page, and sends no further HTTP requests.
    server-->>browser: Responds with status code 201 created
    deactivate server