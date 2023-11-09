let label = document.getElementById("label");

let shoppingCart = document.getElementById("shopping-cart");


let selectedItemContainer = JSON.parse(localStorage.getItem("data")) || [];

let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    let totalItemSelected = 0
    selectedItemContainer.forEach((x)=>{
      return totalItemSelected += x.item
    })
    
    cartIcon.innerText = totalItemSelected;
  }
  
  
  
  calculation()
  
  
  let displayCartItems = () => {
    if(selectedItemContainer.length){
      //CODE BELOW MISBEHAVED!

      let cardItems = generateCartItem();
      cardItems = cardItems.join(``)
      return shoppingCart.innerHTML = cardItems

      // return shoppingCart.innerHTML = selectedItemContainer.map((x)=>{
      //   return `
      //       <div class="card-item"></div>
        
      //   `
      // }).join("")
    
    }
    else{
      shoppingCart.innerHTML = ``;
      label.innerHTML = `
              <h2>Cart is Empty</h2>
              <a href="index.html">
                <button class="homeBtn">Back to home</button>
              </a>
      
                        `
    }
  }
  
  function generateCartItem(){
    return  selectedItemContainer.map((x)=>{
      let {id, item} = x;
      let search = shopItemsData.find((x)=>{
        return x.id === id
       }) || [];

       let {name,price,desc,img} = search

      return `
              <div class="card-item">
                <img width="100" src=${img} alt=""/>
                <div class="details">
                  <div class="title-price-x">
                    <h4 class="title-price">
                      <p>${name}</p>
                      <p class="cart-item-price" >$${price}</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                  </div>

                  <div class="buttons">
                    <i onclick="decrement(${id})" class=" bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment(${id})" class=" bi bi-plus-lg"></i>
                  </div>
                  <h3>$ ${item*price}</h3>
               </div>
              </div>
              
             `
    })
  }
      displayCartItems()
      

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
        
        displayCartItems()

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
        
        displayCartItems()
        
        localStorage.setItem("data",JSON.stringify(selectedItemContainer))
      }
      
 
      let update = (id )=>{
        let search = selectedItemContainer.find((x)=>{
          return x.id===id
        })
      
        document.getElementById(id).innerText = search.item;
        calculation()
        totalAmount()
      }
      

      let removeItem = (id)=>{
        //Why is the ID at line 74 returning the whole HTML element?
        let selectedEl = id.id
        selectedItemContainer = selectedItemContainer.filter((x)=>{
          return x.id !== selectedEl;
        })
        
       
        displayCartItems()
        calculation()
        totalAmount()
        
        localStorage.setItem("data",JSON.stringify(selectedItemContainer))
      }

      let clearCart = ()=>{
        selectedItemContainer = []
        displayCartItems()
        localStorage.setItem("data",JSON.stringify(selectedItemContainer))
  
        calculation()
        totalAmount()
      }

      let totalAmount = ()=>{
        if(selectedItemContainer.length){
            let amount = selectedItemContainer.map((x)=>{
               let { item , id } = x
               let search = shopItemsData.find((x)=>{
                return x.id === id
               })||[]
               return item * search.price;
              })
              amount = amount.reduce((x,y)=>x+y,0)
              console.log(amount)
              label.innerHTML = `
                                  <h2>Total Bill : $${amount}</h2>
                                  <button class="checkout">Checkout</button>
                                  <button onclick="clearCart()" class="removeAll">Clear cart</button>

                                `
          }else return  
        }
        
      totalAmount()























