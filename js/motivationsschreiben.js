(function () {
  "use strict";

  function val(id) {
    var el = document.getElementById(id);
    return el && el.value ? el.value.trim() : "";
  }

  function buildSenderLines() {
    var parts = [
      val("mot-absender-name"),
      val("mot-absender-strasse"),
      val("mot-absender-ort"),
    ].filter(Boolean);
    return parts.join("\n");
  }

  function normalizeSalutation(raw) {
    var a = raw.trim();
    if (!a) {
      a = "Sehr geehrte Damen und Herren";
    }
    if (!/[,.:…]\s*$/.test(a)) {
      a += ",";
    }
    return a;
  }

  function appendParagraph(container, text) {
    if (!text) {
      return;
    }
    var p = document.createElement("p");
    p.textContent = text;
    container.appendChild(p);
  }

  function render() {
    var root = document.getElementById("motivation-preview");
    if (!root) {
      return;
    }
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }

    var sender = buildSenderLines();
    var datum = val("mot-datum");
    var firma = val("mot-empfaenger-firma");
    var empAdr = val("mot-empfaenger-adresse");
    var stelle = val("mot-stelle");
    var anrede = normalizeSalutation(val("mot-anrede"));
    var motivation = val("mot-motivation");
    var bezug = val("mot-bezug");
    var erfahrung = val("mot-erfahrung");
    var name = val("mot-absender-name");

    var meta = document.createElement("div");
    meta.className = "motivation-letter-meta";

    var senderEl = document.createElement("div");
    senderEl.className = "motivation-letter-sender";
    senderEl.textContent = sender;
    meta.appendChild(senderEl);

    var dateEl = document.createElement("div");
    dateEl.className = "motivation-letter-date";
    dateEl.textContent = datum;
    meta.appendChild(dateEl);
    root.appendChild(meta);

    var rec = document.createElement("div");
    rec.className = "motivation-letter-recipient";
    rec.textContent = [firma, empAdr].filter(Boolean).join("\n");
    root.appendChild(rec);

    var subj = document.createElement("div");
    subj.className = "motivation-letter-subject";
    subj.textContent = stelle
      ? "Betreff: Bewerbung als " + stelle
      : "Betreff: Bewerbung";
    root.appendChild(subj);

    var body = document.createElement("div");
    body.className = "motivation-letter-body";

    var sal = document.createElement("p");
    sal.className = "motivation-letter-salutation";
    sal.textContent = anrede;
    body.appendChild(sal);

    appendParagraph(body, motivation);
    appendParagraph(body, bezug);
    appendParagraph(body, erfahrung);

    if (!motivation && !bezug && !erfahrung) {
      var hint = document.createElement("p");
      hint.style.fontStyle = "italic";
      hint.style.opacity = "0.7";
      hint.textContent =
        "Hier erscheinen Ihre Absätze, sobald Sie die Felder «Motivation», «Bezug zum Unternehmen» und «Erfahrung» ausfüllen.";
      body.appendChild(hint);
    }

    root.appendChild(body);

    var closing = document.createElement("p");
    closing.className = "motivation-letter-closing";
    closing.textContent = "Mit freundlichen Grüssen";
    root.appendChild(closing);

    var nameP = document.createElement("p");
    nameP.className = "motivation-letter-name";
    nameP.textContent = name;
    root.appendChild(nameP);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("motivation-form");
    var btn = document.getElementById("motivation-print-btn");
    if (form) {
      form.addEventListener("input", render);
      form.addEventListener("change", render);
    }
    if (btn) {
      btn.addEventListener("click", function () {
        window.print();
      });
    }
    render();
  });
})();
