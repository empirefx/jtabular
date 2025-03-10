const V = (r, y = "horizontal", T = [], x = []) => {
  Array.isArray(r) || (r = [r]);
  const u = (A, f = 0) => {
    const o = document.createElement("table"), s = document.createElement("thead"), m = document.createElement("tbody"), d = /* @__PURE__ */ new Set(), p = [];
    f !== 0 && o.classList.add("nested-table");
    const w = (l, t = {}, n = 0) => {
      for (const [e, a] of Object.entries(l))
        if (!x.includes(e))
          if (typeof a == "object" && a !== null) {
            if (Array.isArray(a)) {
              const c = u(a, n + 1), C = document.createElement("td");
              C.appendChild(c), t[e] = C.outerHTML;
            }
            d.add(e);
          } else
            t[e] = a, d.add(e);
      p.push(t);
    };
    A.forEach((l) => w(l));
    const i = document.createElement("table"), h = document.createElement("td"), E = document.createElement("tr");
    i.classList.add("mix-table"), h.setAttribute("colspan", d.size + 1);
    const L = () => {
      b(!0), h.appendChild(i), E.appendChild(h), o.appendChild(E);
    }, H = (l = !1) => {
      d.forEach((t) => {
        if (T.includes(t)) return;
        const n = document.createElement("tr"), e = document.createElement("th");
        e.textContent = t, n.appendChild(e), p.forEach((a) => {
          const c = document.createElement("td");
          c.innerHTML = a[t] ?? "", n.appendChild(c);
        }), d.delete(t), o.appendChild(n);
      });
    }, b = (l = !1) => {
      const t = document.createElement("tr");
      d.forEach((n) => {
        const e = document.createElement("th");
        e.textContent = n, t.appendChild(e), s.appendChild(t);
      }), p.forEach((n) => {
        const e = document.createElement("tr");
        d.forEach((a) => {
          const c = document.createElement("td");
          (l || String(n[a]).match("nested-table")) && c.setAttribute("valign", "top"), c.innerHTML = n[a] ?? "", e.appendChild(c);
        }), m.appendChild(e);
      }), l ? (i.appendChild(s), i.appendChild(m)) : (o.appendChild(s), o.appendChild(m));
    };
    return y === "vertical" && f === 0 ? (H(), L()) : b(), o;
  };
  return u(r);
};
export {
  V as default
};
