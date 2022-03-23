"use strict"

let index = 0;

window.addEventListener("resize", function(){
    setIndicator(index)
})

function setIndicator(indicator){
    index = indicator;
    setIndicatorUnderlines()

    function setIndicatorUnderlines(){
        let underlineWidth = "";
        const tablet = 800;

        window.innerWidth <= tablet
        ? underlineWidth = "60px"
        : underlineWidth = "70%"

        const underlines = [...document.querySelectorAll(".indicator-underline")]
        underlines.forEach(function(underline, index){
            index === indicator ? underline.style.width = underlineWidth : underline.style.width = "0"
        })
    }
};

function populateMenu(menuItems){
    const menu = document.querySelector(".menu")
    menu.innerHTML = "";
    setMenuItems()

    function setMenuItems(){
        [...menuItems].forEach(function(menuItem){
            switch(menuItem.category){
                case "separator":
                    return setSeparator(menuItem)
                case "food":
                    return setFood(menuItem)
                case "drink":
                    return setDrink(menuItem)
                default: alert("Error in setMenuItems")
            }
        })
    }

    function setSeparator(item){
        const menuSeparator = `<div class="menu-separator">${item.description}</div>`;
        menu.insertAdjacentHTML("beforeend", menuSeparator)
    }

    function setFood(item){
        const foodItem = `
            <article class="food-item">
                <h3 class="food-item-name">${item.name}</h3>
                <p class="food-item-description">${item.description}</p>
                <p class="food-item-price">${item.price}</p>
            </article>
        `
        menu.insertAdjacentHTML("beforeend", foodItem)
    }

    function setDrink(item){
        const drinkItem = `
            <article class="drink-item">
                <h3 class="drink-item-name">${item.name}</h3>
                <p class="drink-item-description">${item.description}</p>
                <p class="drink-item-price">${item.price}</p>
            </article>
        `
        menu.insertAdjacentHTML("beforeend",drinkItem)
    }
};

(async function(){
    const urls = [
        "/data/starters.json",
        "/data/mains.json",
        "/data/desserts.json",
        "/data/drinks.json"
    ]

    const promises = urls.map(async function(url){
        try {
            const response = await fetch(url)
            return await response.json()
        }
        catch(error){
            alert(error)
        }
    })
    const data = await Promise.all(promises)
    const [starters, mains, desserts, drinks] = data;
    setEventListeners()

    function setEventListeners(){
        const navBtns = [...document.querySelectorAll(".nav-btn")]
        navBtns.forEach(function(btn){
            switch(btn.id){
                case "starter-btn":
                    btn.addEventListener("click", function(){
                        setIndicator(0)
                        populateMenu(starters)
                    })
                    break;
                case "main-btn":
                    btn.addEventListener("click", function(){
                        setIndicator(1)
                        populateMenu(mains)
                    })
                    break;
                case "dessert-btn":
                    btn.addEventListener("click", function(){
                        setIndicator(2)
                        populateMenu(desserts)
                    })
                    break;
                case "drink-btn":
                    btn.addEventListener("click", function(){
                        setIndicator(3)
                        populateMenu(drinks)
                    })
                    break;
                default: alert("Error in setEventListeners")
            }
        })
    }
    setIndicator(index)
    populateMenu(starters)
})()

