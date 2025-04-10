const { parse } = require("url");
const { createServer } = require("http");
const { readFileSync } = require("fs");
const { renderToString } = require("react-dom/server");
const React = require("react");
const server = createServer((req, res) => {
  const pathname = parse(req.url, true).pathname;
  const htmlTemplate = readFileSync(`${__dirname}/index.html`, "utf-8");
  const clientJS = readFileSync(`${__dirname}/client.js`, "utf-8");

  if (pathname === "/") {
    const renderedHTML = renderToString(<Home />);
    const finalHTML = htmlTemplate.replace(
      '<div id="root"></div>',
      `<div id="root">${renderedHTML}</div>`
    );
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(finalHTML);
  } else if (pathname === "/test") {
    res.end("TEST");
  } else if (pathname === "/client.js") {
    res.writeHead(200, { "Content-Type": "text/javascript" });
    res.end(clientJS);
  } else {
    res.end("The URL cannot be found!");
  }
});
server.listen(8000, () => {
  console.log("Listening for requests on port 8000");
});

/*################################################################# */
const pizzas = [
  {
    name: "Focaccia",
    price: 6,
  },
  {
    name: "Pizza Margherita",
    price: 10,
  },
  {
    name: "Pizza Spinaci",
    price: 12,
  },
  {
    name: "Pizza Funghi",
    price: 12,
  },
  {
    name: "Pizza Prosciutto",
    price: 15,
  },
];

function Home() {
  return (
    <div>
      <h1>🍕 Fast React Pizza Co.</h1>
      <p>This page has been rendered with React on the server 🤯</p>

      <h2>Menu</h2>
      <ul>
        {pizzas.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.name} />
        ))}
      </ul>
    </div>
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <span>{count}</span>
    </div>
  );
}

function MenuItem({ pizza }) {
  return (
    <li>
      <h4>
        {pizza.name} (${pizza.price})
      </h4>
      <Counter />
    </li>
  );
}
