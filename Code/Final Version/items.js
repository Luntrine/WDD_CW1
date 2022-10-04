// used to calculate total price of all products in the basket
function calcPrice(){
	var products = document.getElementsByClassName("grid-container-p");
	var price = 0;
	for (var i = 0; i < products.length; i++) {
			price += parseFloat(products[i].children[3].innerHTML.substring(1));
	}
	let cost = "Total price: £" + price.toFixed(2);
	document.getElementById("price").innerHTML = cost;
	document.cookie = "price=" + cost + ";";
}

// used to set the price of items in the basket on the order page
function getPrice(){
	document.getElementById("price").innerHTML = getCookie("price");
}

// used to add a product to the basket
function add(id){
	var currentBasket = getCookie("basket");
	if(currentBasket == undefined || currentBasket == ""){
		document.cookie = "basket=" + id + ";";
	} else {
		let newBasket = "basket=" + currentBasket + "," + id + ";";
		document.cookie = newBasket;
	}
	getNumItems();
}


// gets the data from a cookie with a specific name (id)
function getCookie(id) {
	let name = id.length + 1;
	let array = document.cookie.split(";");
	for(let i = 0; i <array.length; i++) {
		let c = array[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.substring(0, name) == id + "=") {
			return c.substring(name, c.length);
		}
	}
	return undefined;
}

// displays items in basket cookie on the basket page
function displayBasket(){
	var items = getCookie("basket");
	console.log(items);
	if(!(items == undefined || items == "")){
		var itemList = items.split(',');
		for(let i = 0; i < itemList.length; i++) {
			var temp = document.getElementById(itemList[i]);
			var clon = temp.content.cloneNode(true);
			document.getElementById("item-location").appendChild(clon);
		}
	}
	calcPrice();
	getNumItems();
}

// removes all items from the basket
function removeAll(){
	document.cookie = "basket=; Max-Age=0";
	location.reload();
}

// removes a specific item from the basket
function remove(id){
	var items = getCookie("basket");
	console.log(items);
	var itemList = items.split(',');
	for(let i = 0; i < itemList.length; i++) {
		if(itemList[i] == id){
			itemList.splice(i, 1);
			break;
		}
		
	}
	document.cookie = "basket=" + itemList.join() + ";";
	location.reload();
}

// gets the number of items in the basket
function getNumItems(){
	var items = getCookie("basket");
	if(items !== undefined){
		var itemList = items.split(',');
		document.getElementById("basketnum").innerHTML = "Basket (" + itemList.length + ")";
	}
	added();
}

// used to change the add to basket text if an item is already in the basket
function added(){
	if(document.getElementById("basketnum").className !== "current"){
		var items = getCookie("basket");
		if(items !== undefined){
			var itemList = items.split(',');
			var products = document.getElementsByClassName("grid-container-p")
			for(let i = 0; i < itemList.length; i++) {
				for(let j = 0; j < products.length; j++) {
					if(itemList[i] == products[j].id){
						document.getElementById(products[j].id).children[4].innerHTML = "<a href='#'>Added to Basket</a>";
					}
				}
			}
		}
	}
}

// lists the items in the basket on the order page
function listItems(){
	var items = getCookie("basket");
	if(items !== undefined){
		var itemList = items.split(',');
		var list = "";
		for(let i = 0; i < itemList.length; i++){
			list += itemList[i] + "<br>";
		}
		document.getElementById("list").innerHTML = list;
	}
}

// the search function
function openPage(){
	var x = document.getElementById("box").value
	
	if (x === "Electric Bikes"){
		window.location.href = "electric_bikes.html";
	}
	if (x === "Kids Electric Vehicles"){
		window.location.href = "kids_electric_vehicles.html";
	}
	if (x === "Outdoor Equipment"){
		window.location.href = "outdoor_equipment.html";
	}
	if (x === "Scooters"){
		window.location.href = "scooters.html";
	}
	if (x === "Small Electric Toys"){
		window.location.href = "small_electric_toys.html";
	}
	if (x === "Home"){
		window.location.href = "home.html";
	}
}
				



