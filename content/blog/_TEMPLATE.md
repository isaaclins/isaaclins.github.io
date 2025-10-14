+++
title = "TEMPLATE"
date = 2025-06-13
draft = true
tags = ["TEMPLATE", "TEMPLATE2"]
complexity = "easy"
description = "A compelling, concise description for SEO (under 160 characters). This will appear in search results."
+++

in this example post, I'm going to show you how to use markdown to format your posts.
notice that the title is "TEMPLATE" and the date is 2025-04-16. use the current date in the format YYYY-MM-DD.
also notice that the draft is set to true. this means that the post is not published yet.
after you're done editing, set the draft to false.

**SEO Fields Explained:**

- **description**: This is what appears in Google search results and social media shares. Keep it under 160 characters and make it compelling!
- **image**: Optional featured image for the post. This will be used in social media previews (Open Graph/Twitter Cards). If not set, the site will use the default image.
- **tags**: These become keywords for SEO and help categorize your content.

## Basic Formatting

Want to make your text **stand out**? Use double asterisks or double underscores.
`**Bold text**` or `__also bold__`.

For a bit of _emphasis_, single asterisks or underscores will do the trick.
`*Italic text*` or `_also italic_`.

Need **_both_**? Combine them.
`***Bold and italic***` or `___also bold and italic___.`

To ~~cross something out~~, use double tildes.
`~~Strikethrough text~~`.

## Headings

Structure your content clearly. Use these heading levels:

## Heading 2

### Heading 3

#### Heading 4

Don't bother with these: `# Heading 1`, `##### Heading 5`, `###### Heading 6`. They mess with the hierarchy.

## Lists

### Unordered Lists

Good for itemizing things. Don't overdo it.

- Item 1
- Item 2
  - Nested item 2.1 (use two spaces for indentation)
  - Nested item 2.2
- Item 3

### Task Lists

Keep track of what's done and what's not.

- [x] This task is done.
- [ ] This one's still pending.
- [ ] Another one to go.

## Links

Link to stuff. It's easy.

[This link goes to an external website](https://example.com)
[This one points to another page on this site](/blog/another-post/)

For a more impactful link, make it bold:
[**This is a bold link to something important**](https://github.com/isaaclins/)

## Images

Show, don't just tell. Images are crucial.
Make sure your images are in the `images/` folder. If it's an SVG, put it in `images/svg/`.

This is how you embed a standard image:
`![Alt text describing the image](/images/your-image-filename.png)`

Example from the Raycast post:
`![create snippet](/images/raycast-create-snippet.png?raw=true)`

And this is for an SVG:
`![Alt text for SVG](/images/svg/your-svg-filename.svg)`

Example from the Raycast post:
`![raycast.svg](/images/svg/raycast.svg)`

You can even put images inside tables, like in the Raycast post comparing launchers:
`![PowerToys Run](/images/svg/powertoys-run.svg)`

## Blockquotes

Use blockquotes for quoting someone or emphasizing a block of text.

> This is a blockquote.
> It can span multiple lines.
>
> > Nested blockquotes are also possible. Just add another `>`

## Code Blocks

Show off your code. Use backticks for inline `code`.
For bigger chunks, use triple backticks and specify the language:

```python
# This is a Python code block
print("Hello, World!")
```

```javascript
// This is a JavaScript code block
console.log("Hello, World!");
```

```text
This is a generic text block, good for logs or simple text snippets.
:date -> May 6, 2025
:sig -> ~ ⋖,^><
```

## Tables

Tables are great for comparisons or structured data. Get straight to the point.
The syntax is a bit finicky but powerful. Pay attention to the hyphens for alignment.

```markdown
| Left-aligned Header | Center-aligned Header | Right-aligned Header |
| :------------------ | :-------------------: | -------------------: |
| Content Cell 1      |    Content Cell 2     |       Content Cell 3 |
| Another row         |     And more data     |           Right here |
| Short               |        Medium         | Long content example |
```

Here's a real example from the Raycast post:

```markdown
| Feature                           | ![PowerToys Run](/images/svg/powertoys-run.svg) | ![Flow Launcher](/images/svg/flow-launcher.svg) |
| --------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| Customization                     | ⚠️limited                                       | ✅                                              |
| Plugin System                     | ⚠️limited                                       | ⚠️limited                                       |
| Snippets                          | ❌                                              | ✅                                              |
| Clipboard History                 | ✅                                              | ✅                                              |
| Custom links with query insertion | ✅                                              | ✅                                              |
```

And another one:

```markdown
| Credits                                                     |
| ----------------------------------------------------------- |
| [**Raycast**](https://www.raycast.com/)                     |
| [**Flow Launcher**](https://flowlauncher.com/)              |
| [**PowerToys Run**](https://github.com/microsoft/PowerToys) |
```

## Horizontal Rules

Need to visually break up sections? Use three enter key presses.

## Mermaid Diagrams

Mermaid is a powerful tool for creating diagrams using markdown-like syntax. Here are some examples:

### Sequence Diagram

```mermaid
sequenceDiagram
Alice->>Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->>Alice: I am good thanks!
```

**Best for:** Showing how different parts of a system interact with each other over time. It's great for visualizing the flow of messages or calls between objects or components.

### Gantt Diagram

```mermaid
gantt

        dateFormat  YYYY-MM-DD
        title Adding GANTT diagram functionality to mermaid

        section A section
        Completed task            :done,    des1, 2014-01-06,2014-01-08
        Active task               :active,  des2, 2014-01-09, 3d
        Future task               :         des3, after des2, 5d
        Future task2               :         des4, after des3, 5d

        section Critical tasks
        Completed task in the critical line :crit, done, 2014-01-06,24h
        Implement parser and jison          :crit, done, after des1, 2d
        Create tests for parser             :crit, active, 3d
        Future task in critical line        :crit, 5d
        Create tests for renderer           :2d
        Add to mermaid                      :1d

        section Documentation
        Describe gantt syntax               :active, a1, after des1, 3d
        Add gantt diagram to demo page      :after a1  , 20h
        Add another diagram to demo page    :doc1, after a1  , 48h

        section Last section
        Describe gantt syntax               :after doc1, 3d
        Add gantt diagram to demo page      : 20h
        Add another diagram to demo page    : 48h
```

**Best for:** Project management. It helps visualize a project schedule, showing the start and end dates of tasks, as well as their dependencies.

### Class Diagram

```mermaid
classDiagram
    class Class1 {
        -privateField: int
        +publicMethod()
    }
    Class1 <|-- Class2
    Class1 --> Class3
    Class3 --> Class2
```

**Best for:** Object-oriented software design. It provides a static view of a system by showing its classes, their attributes, methods, and the relationships between them.

### State Diagram

```mermaid
stateDiagram-v2
    [*] --> State1
    State1 --> State2
    State2 --> [*]
```

**Best for:** Modeling the behavior of an object. It shows the different states an object can be in and the transitions between those states in response to events.

### Pie Chart

```mermaid
pie
    title Pie Chart Example
    "Dogs" : 386
    "Cats" : 584
    "Rats" : 257
```

**Best for:** Showing proportions. It's a simple way to visualize how different parts make up a whole.

### Requirement Diagram

```mermaid
requirementDiagram

    requirement test_req {
    id: 1
    text: the test text.
    risk: high
    verifymethod: test
    }

    element test_entity {
    type: simulation
    }

    test_entity - satisfies -> test_req
```

**Best for:** System analysis and design. It helps to visualize requirements and their relationships with other elements, such as components that satisfy them.

### Git Graph

```mermaid
gitGraph
    commit
    branch new-feature
    checkout new-feature
    commit
    checkout main
    merge new-feature
    commit
```

**Best for:** Visualizing Git branching and merging. It makes it easy to understand the history of a repository.

### Mindmap

```mermaid
mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid
```

**Best for:** Brainstorming and organizing ideas. It starts with a central concept and branches out into related topics.

### ER Diagram

```mermaid
erDiagram
          CUSTOMER }|..|{ DELIVERY-ADDRESS : has
          CUSTOMER ||--o{ ORDER : places
          CUSTOMER ||--o{ INVOICE : "liable for"
          DELIVERY-ADDRESS ||--o{ ORDER : receives
          INVOICE ||--|{ ORDER : covers
          ORDER ||--|{ ORDER-ITEM : includes
          PRODUCT-CATEGORY ||--|{ PRODUCT : contains
          PRODUCT ||--o{ ORDER-ITEM : "ordered in"

```

**Best for:** Database design. It shows the relationships between entities (like tables) in a database.

### Quadrant Chart

```mermaid
quadrantChart
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
    Campaign C: [0.57, 0.69]
    Campaign D: [0.78, 0.34]
    Campaign E: [0.40, 0.34]
    Campaign F: [0.35, 0.78]
```

**Best for:** Strategic analysis. It helps to plot data points along two axes, dividing them into four quadrants for easier comparison and decision-making.

### C4 Model

```mermaid
    C4Context
      title System Context diagram for Internet Banking System
      Enterprise_Boundary(b0, "BankBoundary0") {
        Person(customerA, "Banking Customer A", "A customer of the bank, with personal bank accounts.")
        Person(customerB, "Banking Customer B")
        Person_Ext(customerC, "Banking Customer C", "desc")

        Person(customerD, "Banking Customer D", "A customer of the bank, <br/> with personal bank accounts.")

        System(SystemAA, "Internet Banking System", "Allows customers to view information about their bank accounts, and make payments.")

        Enterprise_Boundary(b1, "BankBoundary") {

          SystemDb_Ext(SystemE, "Mainframe Banking System", "Stores all of the core banking information about customers, accounts, transactions, etc.")

          System_Boundary(b2, "BankBoundary2") {
            System(SystemA, "Banking System A")
            System(SystemB, "Banking System B", "A system of the bank, with personal bank accounts. next line.")
          }

          System_Ext(SystemC, "E-mail system", "The internal Microsoft Exchange e-mail system.")
          SystemDb(SystemD, "Banking System D Database", "A system of the bank, with personal bank accounts.")

          Boundary(b3, "BankBoundary3", "boundary") {
            SystemQueue(SystemF, "Banking System F Queue", "A system of the bank.")
            SystemQueue_Ext(SystemG, "Banking System G Queue", "A system of the bank, with personal bank accounts.")
          }
        }
      }

      BiRel(customerA, SystemAA, "Uses")
      BiRel(SystemAA, SystemE, "Uses")
      Rel(SystemAA, SystemC, "Sends e-mails", "SMTP")
      Rel(SystemC, customerA, "Sends e-mails to")

      UpdateElementStyle(customerA, $fontColor="red", $bgColor="grey", $borderColor="red")
      UpdateRelStyle(customerA, SystemAA, $textColor="blue", $lineColor="blue", $offsetX="5")
      UpdateRelStyle(SystemAA, SystemE, $textColor="blue", $lineColor="blue", $offsetY="-10")
      UpdateRelStyle(SystemAA, SystemC, $textColor="blue", $lineColor="blue", $offsetY="-40", $offsetX="-50")
      UpdateRelStyle(SystemC, customerA, $textColor="red", $lineColor="red", $offsetX="-50", $offsetY="20")

      UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

**Best for:** Software architecture visualization. It allows you to describe a system's architecture at different levels of detail (Context, Containers, Components, and Code).

### Sequence Diagram

```mermaid
sequenceDiagram
    participant web as Web Browser
    participant blog as Blog Service
    participant account as Account Service
    participant mail as Mail Service
    participant db as Storage

    Note over web,db: The user must be logged in to submit blog posts
    web->>+account: Logs in using credentials
    account->>db: Query stored accounts
    db->>account: Respond with query result

    alt Credentials not found
        account->>web: Invalid credentials
    else Credentials found
        account->>-web: Successfully logged in

        Note over web,db: When the user is authenticated, they can now submit new posts
        web->>+blog: Submit new post
        blog->>db: Store post data

        par Notifications
            blog--)mail: Send mail to blog subscribers
            blog--)db: Store in-site notifications
        and Response
            blog-->>-web: Successfully posted
        end
    end

```

**Best for:** Showing how different parts of a system interact with each other over time. It's great for visualizing the flow of messages or calls between objects or components.

That's the gist of it. Now go write something awesome.
