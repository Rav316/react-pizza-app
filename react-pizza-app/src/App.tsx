import "./scss/app.scss";
import { Categories, Header, Sort } from "./components/shared";
import { PizzaBlock } from "./components/shared/pizza-block.tsx";

const App = () => {
  return (
    <>
      <body>
        <div className="wrapper">
          <Header />
          <div className="content">
            <div className="container">
              <div className="content__top">
                <Categories />
                <Sort />
              </div>
              <h2 className="content__title">Все пиццы</h2>
              <div className="content__items">
                <PizzaBlock/>
                <PizzaBlock/>
                <PizzaBlock/>
                <PizzaBlock/>
                <PizzaBlock/>
                <PizzaBlock/>
                <PizzaBlock/>
                <PizzaBlock/>
                <PizzaBlock/>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default App;
