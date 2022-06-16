init();

function init()
{
    var items = document.querySelector('#items');
    items.style.display = 'none';
    items.replaceChildren();
    document.getElementById('filter').value = '';
    var recipe = document.querySelector('#intro-list');
    recipe.replaceChildren();
}


document.querySelector('.btn-search').addEventListener('click',search_recipe);

function search_recipe()
{
    document.querySelector('.start').style.display = 'none';
    var input = document.querySelector('#filter').value;
    console.log(input);
    init();
    fetchData(input);
    // test();
    // document.querySelector('#items').style.display = 'flex';
}

async function fetchData(input) {
    const res = await fetch ('https://forkify-api.herokuapp.com/api/search?q='+input);
    const data = await res.json();
    console.log(data);
    var list = document.getElementById('items');
    data.recipes.forEach(element => {
        var li = document.createElement('li');
        li.classList = 'list-group-item pointer' ;
        var image = document.createElement('img');
        image.src = element.image_url;
        image.classList = "img-responsive rounded-circle float-left col-sm-3 title-img";
        // image.style.maxHeight = '100px';
        li.appendChild(image);
        var text = document.createElement('div');
        text.classList = "float-right col-sm-9";
        var title = document.createElement('h4');
        title.appendChild(document.createTextNode(element.title));
        title.classList = "list-title";
        li.addEventListener("click",function(){
            console.log(element.recipe_id);
            var recipe = document.querySelector('#intro-list');
            recipe.replaceChildren();
            fetchRecipe(element.recipe_id);
        });
        var publisher = document.createElement('p');
        publisher.appendChild(document.createTextNode(element.publisher));
        text.appendChild(title);
        text.appendChild(publisher);
        li.appendChild(text);
        list.appendChild(li);
    });
    document.querySelector('#items').style.display = 'flex';   
}

async function fetchRecipe(input) {
    const res = await fetch ('https://forkify-api.herokuapp.com/api/get?rId='+input);
    const data = await res.json();
    console.log(data);
    document.getElementById('intro').style.display = 'none';
    var list = document.getElementById('intro-list');
    console.log(list);
    var title = document.createElement('h3');
    title.appendChild(document.createTextNode(data.recipe.title));
    var image = document.createElement('img');
    image.src = data.recipe.image_url;
    image.classList = 'img-responsive rounded';
    image.style.maxHeight = '300px';
    image.style.maxWidth = '300px';
    image.style.marginBottom = '25px';
    var something = document.createElement('h4');
    something.appendChild(document.createTextNode('Ingredients :'));
    var ingredients = document.createElement('ul');
    ingredients.classList = 'list-group';
    data.recipe.ingredients.forEach(element => {
        var li = document.createElement('li');
        li.className = 'list-group-item' ;
        li.appendChild(document.createTextNode(element));
        ingredients.appendChild(li);
    });
    ingredients.style.marginBottom = '25px';
    var button = document.createElement('a');
    button.classList = 'btn btn-lg btn-primary';
    button.appendChild(document.createTextNode('View Entire Recipe'));
    // console.log(data.recipe.source_url);
    button.href = data.recipe.source_url;
    list.appendChild(title);
    list.appendChild(image);
    list.appendChild(something);
    list.appendChild(ingredients);
    list.appendChild(button);
}

function test()
{
    var list = document.getElementById('items');
    // console.log(list);
    var li = document.createElement('li');
    li.className = 'list-group-item' ;
    console.log(li);
    li.appendChild(document.createTextNode('hello'));
    // li.appendChild('li');
    list.appendChild(li);
    console.log(list);
}

// fectchData();

