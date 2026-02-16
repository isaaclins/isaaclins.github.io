+++
title = "How Do Web Vulnerabilities Actually Work?"
date = 2025-06-22
draft = true
tags = ["Security", "How?", "Web", "SQL Injection", "XSS", "SSRF"]
complexity = "medium"
+++

You've heard the terms. SQL Injection. Cross-Site Scripting. SSRF. They get thrown around in security reports, news articles about breaches, and that one guy at the party who "knows computers."

But do you actually understand what's happening? Not just "bad input goes in, bad things come out," but the actual mechanics? What does the server see? What does the database execute? Where exactly does the trust break down?

Let's fix that. We're going to build interactive simulators so you can see—step by step—exactly how these attacks work. No theory. Just the raw, unfiltered flow of data from your browser to the database and back.

Stop being scared of these terms. Let's dissect them.

---

## SQL Injection: When Your Input Becomes Code

### What Is It?

SQL Injection is what happens when a developer trusts user input way too much. Instead of treating your input as _data_, the application accidentally treats it as _code_.

Here's the vulnerable pattern in pseudocode:

```python {linenos=table,hl_lines=[2]}
username = request.get("username")  # Whatever the user typed
query = "SELECT * FROM users WHERE username = '" + username + "'"
database.execute(query)
```

See the problem? The user's input is directly concatenated into the SQL query. If you type `admin`, the query becomes:

```sql {linenos=table}
SELECT * FROM users WHERE username = 'admin'
```

Totally fine. But what if you type `' OR 1=1 --`? Now the query becomes:

```sql {hl_lines=[1]}
SELECT * FROM users WHERE username = '' OR 1=1 --'
```

Let's break that down:

- The `'` closes the string that was opened by the developer
- `OR 1=1` is always true, so the WHERE clause matches _every_ row
- `--` is a SQL comment, ignoring the rest of the query (including that trailing `'`)

**Result:** Instead of getting one user, the attacker gets _all_ users.

### Try It Yourself

Use the interactive demo below. First, try a normal username. Then, select "Malicious" from the dropdown and watch how the query transforms. Step through each stage to see exactly where things go wrong.

{{< sql-flow id="sql-demo-1" benign="admin" malicious="' OR 1=1 --" >}}

### What Did You Learn?

The vulnerability exists because:

1. **User input is trusted** — The server assumes the username is just text
2. **String concatenation is used** — The input is glued directly into the SQL query
3. **No escaping or parameterization** — Special characters like `'` aren't neutralized

The fix? **Parameterized queries** (also called prepared statements):

```python {linenos=table,hl_lines=[1,2]}
query = "SELECT * FROM users WHERE username = ?"
database.execute(query, [username])  # Input is treated as DATA, never CODE
```

With parameterized queries, even if you type `' OR 1=1 --`, the database will literally search for a user named `' OR 1=1 --`, not execute it as SQL logic.

---

## More Vulnerabilities Coming Soon

This is a living document. We'll be adding interactive demos for:

- **Cross-Site Scripting (XSS)** — When your input becomes JavaScript in someone else's browser
- **Server-Side Request Forgery (SSRF)** — When you trick a server into making requests for you
- **Brute Force Attacks** — When patience (and automation) beats complexity

Each one will get the same treatment: explanation, interactive demo, and the "aha moment" where you see exactly why it works.

---

## The Takeaway

These vulnerabilities aren't magic. They're not even complicated. They're the result of a simple mistake: **trusting user input**.

Every single one of these attacks exploits the gap between what the developer _expected_ you to type and what you _actually_ typed. The moment your input leaves your keyboard, it should be treated as hostile until proven otherwise.

Now you know. Go build something secure.

~ ⋖,^><
