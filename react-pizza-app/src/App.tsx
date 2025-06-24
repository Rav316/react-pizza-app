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
                <PizzaBlock
                  title={"Охотничья"}
                  price={629}
                  imageUrl={
                    "https://media.dodostatic.net/image/r:584x584/019635b27c727302835040e5d7c27caa.avif"
                  }
                />
                <PizzaBlock
                  title={"Креветка и песто"}
                  price={699}
                  imageUrl={
                    "https://media.dodostatic.net/image/r:584x584/019591b642d87304a62d322945990861.avif"
                  }
                />
                <PizzaBlock
                  title={"Четыре сыра"}
                  price={559}
                  imageUrl={
                    "https://media.dodostatic.net/image/r:584x584/11ee7d612a1c13cbbfcc286c332d7762.avif"
                  }
                />
                <PizzaBlock
                  title={"Чилл Грилл"}
                  price={539}
                  imageUrl={
                    "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif"
                  }
                />
                <PizzaBlock
                  title={"Охотничья"}
                  price={629}
                  imageUrl={
                    "https://media.dodostatic.net/image/r:584x584/019635b27c727302835040e5d7c27caa.avif"
                  }
                />
                <PizzaBlock
                  title={"Креветка и песто"}
                  price={699}
                  imageUrl={
                    "https://media.dodostatic.net/image/r:584x584/019591b642d87304a62d322945990861.avif"
                  }
                />
                <PizzaBlock
                  title={"Четыре сыра"}
                  price={559}
                  imageUrl={
                    "https://media.dodostatic.net/image/r:584x584/11ee7d612a1c13cbbfcc286c332d7762.avif"
                  }
                />
                <PizzaBlock
                  title={"Чилл Грилл"}
                  price={539}
                  imageUrl={
                    "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default App;
