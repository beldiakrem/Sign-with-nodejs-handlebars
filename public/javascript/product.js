//post to create product

function create(shop) {
    console.log('create product for ' + shop);
    $.ajax({
        url: '/shopify/app/create-product?shop=' + shop,
        type: 'Post',
        success: function (result) {
            console.log(result);
        }
    });
}

//create product by user input
function createByUser(shop) {

    let title = $("#title").val();
    let body_html = $("#body_html").val();
    let vendor = $("#vendor").val();
    let product_type = $("#producttype").val();
    let tags = $("#tags").val();


    if (title.length > 0) {
        let product = {
            title: title,
            body_html: body_html,
            vendor: vendor,
            product_type: product_type,
            tags: tags
        }


        $.ajax({
            url: '/shopify/app/create-product?shop=' + shop,
            type: 'Post', processData: false,
            data: JSON.stringify(product),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log(result);
                if (result) {
                    view(shop);
                }
            }
        });
    } else {
        alert('Enter a title first');
    }

}

function validerSignUp () {
    console.log("validerSignUp")
    let firstName  = $("#firstName").val();
    let lastName = $("#lastName").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let role = $("#role").val();
  
console.log({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    role : role 
},'signup')

    if (firstName.length > 0) {
      let Userup= {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: role
        }
        $.ajax({
            url: '/users/signup',
            type: 'Post', processData: false,
            data: JSON.stringify(Userup),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result, ) {
                console.log(result,"signup")
                $("#firstName").val('');
                    $("#lastName").val('');
                    $("#email").val('');
                    $("#password").val('');
                    window.location.assign(`/signin`);
            }
        });
    } 
            
        
}
function validerSignIn () {
    console.log("validerSignIn")
    let email = $("#email").val();
    let password = $("#password").val();
    
console.log({
    email: email,
    password: password,

    
},'signin')

    if (email.length > 0) {
      let Userin= {
            email: email,
            password: password,
            
        }
        $.ajax({
            url: '/users/signin',
            type: 'Post', processData: false,
            data: JSON.stringify(Userin),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log(result,"signin")
                if(result){
                    $("#email").val('');
                    $("#password").val('');
                    localStorage.setItem('Token',result.token)
                     window.location.assign(`/shopify`);
                     
                     } else {
                    alert('Email does not exist')
                }
                
                
               
            },error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Email does not exist");
               
            } 
             
        });
    }    
}



function navigate(shop) {
    window.location.assign(`/shopify/app?shop=${shop}`);
    
}
function installApp (){
    window.location.assign(`/`);
}

function signin () {
    window.location.assign(`/signin`);
}

function signup () {
    window.location.assign(`/signup`);
}


function backShop(shop) {
    console.log('shop', shop)
    window.location.assign(`/shopify`);
}

function goPaypal(id,shopParam) {
    console.log('goPaypal', id,shopParam)
    $.ajax({
        url: `/shopify/lanch?shop=${shopParam}&id=${id}`,
        type: 'Get',
        success: function (result) {
            console.log(result);
            //addRows(result.products);
        }
    });
}


//view products
function view(shop) {

    $.ajax({
        url: '/shopify/app/products?shop=' + shop,
        type: 'Get',
        success: function (result) {
            console.log(result);
            addRows(result.products);
        }
    });
}
//add products to table
function addRows(products) {
    $("#products tbody").empty();
    products.forEach(element => {
        let row = '<tr><th scope="row">' + element.id + '</th><td>' + element.title + '</td><td>' + element.body_html +
            '</td><td>' + element.vendor + '</td><td>' + element.product_type + '</td><td>' + element.tags + '</td><td><a id="' + element.id + '" onclick="deleteProduct(this.id,userShop)" href="#">Delete</a> | <a id="' + element.id + '" onclick="selectImage(this.id)" href="#">Add Image</a></td></tr>';
        $("#products tbody").append(row);
    });
}

function clearFields() {
    $("#title").val('');
    $("#body_html").val('');
    $("#vendor").val('');
    $("#producttype").val('');
    $("#tags").val('');
}

function deleteProduct(id, shop) {
    $.ajax({
        url: '/shopify/app/delete?shop=' + shop + '&id=' + id,
        type: 'Post',
        success: function (result) {
            console.log(result);
            view(shop);
        }
    });
}

function selectImage(id) {

    $("#uploadImageId").val(id);
    $('#exampleModalCenter').modal('show');
}

function uploadImage() {
    let fd = new FormData();
    let files = $('#productImage')[0].files[0];
    fd.append('file', files);
    let filename = $('#productImage')[0].files[0].name;

    $.ajax({
        url: '/shopify/app/file-upload?shop=' + userShop + '&id=' + $("#uploadImageId").val() + '&filename=' + filename,
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response != 0) {
                console.log(response);
                $('#exampleModalCenter').modal('hide');
                alert("Image uploaded");
            } else {
                alert('file not uploaded');
            }
        },
    });
}