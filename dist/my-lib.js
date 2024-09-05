const V = (r, y = "horizontal", T = [], x = []) => {
  Array.isArray(r) || (r = [r]);
  const u = (w, f = 0) => {
    const d = document.createElement("table"), s = document.createElement("thead"), m = document.createElement("tbody"), l = /* @__PURE__ */ new Set(), p = [];
    f !== 0 && d.classList.add("nested-table");
    const A = (o, t = {}, n = 0) => {
      for (const [e, c] of Object.entries(o))
        if (!x.includes(e))
          if (typeof c == "object" && c !== null) {
            if (Array.isArray(c)) {
              const a = u(c, n + 1), b = document.createElement("td");
              b.appendChild(a), t[e] = b.outerHTML;
            }
            l.add(e);
          } else
            t[e] = c, l.add(e);
      p.push(t);
    };
    w.forEach((o) => A(o));
    const i = document.createElement("table"), h = document.createElement("td"), E = document.createElement("tr");
    i.classList.add("mix-table"), h.setAttribute("colspan", r.length + 1);
    const L = () => {
      C(!0), h.appendChild(i), E.appendChild(h), d.appendChild(E);
    }, H = (o = !1) => {
      l.forEach((t) => {
        if (T.includes(t)) return;
        const n = document.createElement("tr"), e = document.createElement("th");
        e.textContent = t, n.appendChild(e), p.forEach((c) => {
          const a = document.createElement("td");
          a.innerHTML = c[t] ?? "", n.appendChild(a);
        }), l.delete(t), d.appendChild(n);
      });
    }, C = (o = !1) => {
      const t = document.createElement("tr");
      l.forEach((n) => {
        const e = document.createElement("th");
        e.textContent = n, t.appendChild(e), s.appendChild(t);
      }), p.forEach((n) => {
        const e = document.createElement("tr");
        l.forEach((c) => {
          const a = document.createElement("td");
          a.innerHTML = n[c] ?? "", e.appendChild(a);
        }), m.appendChild(e);
      }), o ? (i.appendChild(s), i.appendChild(m)) : (d.appendChild(s), d.appendChild(m));
    };
    return y === "vertical" && f === 0 ? (H(), L()) : C(), d;
  };
  return u(r);
};
export {
  V as default
};
