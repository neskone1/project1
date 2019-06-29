const firebaseConfig = {
        apiKey: "AIzaSyCn7ygSM2eOnXBkrvrGir2tnmYYbeR7uGo",
        authDomain: "groupproject1-30974.firebaseapp.com",
        databaseURL: "https://groupproject1-30974.firebaseio.com",
        projectId: "groupproject1-30974",
        storageBucket: "",
        messagingSenderId: "271261501589",
        appId: "1:271261501589:web:a0ea8fd47e61a1e9"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Assign the reference to the database to a variable named 'database'
  // var database = ...
  const database = firebase.database()

$("#add-food-btn").on("click", function(event){
    event.preventDefault();

    let foodName = $("#food-name-input").val().trim()
    let unitOfMeasure = $("#unit-input").val().trim()
    let quantity = $("#quantity-input").val().trim()
    let dollarValue = $("#dollar-input").val().trim()
    
    console.log(foodName)
    console.log(unitOfMeasure)
    console.log(quantity)
    console.log(dollarValue)

    let newItem = {
        Name:foodName,
        UOM:unitOfMeasure,
        Quantity:quantity,
        DollarValue:dollarValue
    }

database.ref().push(newItem)

})
