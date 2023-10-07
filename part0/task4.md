sequenceDiagram
    participant browser
    participant server

    Note right of browser: Form submit event. Send user input to server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of browser: Server asks for a new GET request to /notes
    server-->>browser: URL redirect 302
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes 
    activate server
    server-->>browser: HTML document
    deactivate server

    Note right of browser: Reload results in three more HTTP requests 
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "hello", "date": "2023-10-07T11:52:28.574Z" }, ... ]
    deactivate server