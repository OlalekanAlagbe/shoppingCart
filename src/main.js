
let selectedItemContainer = JSON.parse(localStorage.getItem("data")) || [];

let shop = document.getElementById("shop");


let shopItems = shopItemsData.map((data)=>{
    let {id,name,price,desc,img} = data;
    return generateShop(id,name,price,desc,img)


})
shopItems = shopItems.join(``)

shop.innerHTML = shopItems

function generateShop (id,name,price,desc,img){

    let search = selectedItemContainer.find((x)=>{
      return x.id === id 
    }) || []
    
    return `
          <div id=item-${id} class="item">  
            <img width="200" src=${img} alt="image">
            <div class="details">
              <h3>${name}</h3>
              <p>${desc}</p>
            <div class="price-quantity"> 
              <h2>$${price}</h2>
              <div class="buttons">
                  <i onclick="decrement(${id})" class=" bi bi-dash-lg"></i>
                  <div id=${id} class="quantity">${search.item === undefined ? 0:search.item}</div>
                  <i onclick="increment(${id})" class=" bi bi-plus-lg"></i>
              </div>
              </div>
              </div>
          </div>
             
            `
}

let increment = (id)=>{
  let selectedItem = id;
  let search = selectedItemContainer.find((x)=>{
    return x.id === selectedItem.id;
  })

  if(!search){
    selectedItemContainer.push({
      id:selectedItem.id,
      item:1
    })
  }else{
     search.item++
  }

  localStorage.setItem("data",JSON.stringify(selectedItemContainer))

  update(selectedItem.id)
}


let decrement = (id)=>{
  let selectedItem = id;
  let search = selectedItemContainer.find((x)=>{
    return x.id === selectedItem.id;
  })

  if(!search){return}

  if(search.item === 0){
    
    return

  }else{
     search.item--
  }

  update(selectedItem.id)  

  selectedItemContainer = selectedItemContainer.filter((choice)=>{
    return choice.item !== 0;
  })
  
  
  localStorage.setItem("data",JSON.stringify(selectedItemContainer))
}

let update = (id )=>{
  let search = selectedItemContainer.find((x)=>{
    return x.id===id
  })

  document.getElementById(id).innerText = search.item;
  calculation()
}


let calculation = ()=>{
  let cartIcon = document.getElementById("cartAmount");
  let totalItemSelected = 0
  selectedItemContainer.forEach((x)=>{
    return totalItemSelected += x.item
  })

  cartIcon.innerText = totalItemSelected;
}



calculation()