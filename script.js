const apikey = '3b14a8764b344f85bf283cbda83d0c1a';
 const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apikey=${apikey}`



const blogContainer = document.getElementById("container");

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");


async function fetchRandomNews() {
    try {
       

        const response = await fetch(apiUrl);

        const data = await response.json()
        return data.articles;


    } catch (error) {
        console.error("Error Fetching The News", error)
        return []
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (query) {
        try {
            const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=100&apikey=${apikey}`

            const response = await fetch(apiUrl);

            const data = await response.json()
            displayBlogs(data.articles);


        } catch (error) {
            console.error("Error Fetching The News", error)
        }
    } else {
        alert("Please enter a search term.")
    }
})


function displayBlogs(articles){

    blogContainer.innerHTML=""
    articles.forEach((article) => {
        const blogCard = document.createElement("div")
        blogCard.classList.add("container-card")

        const img = document.createElement("img")
        img.src = article.urlToImage
        img.alt = article.title

        const title = document.createElement("h2")
        const TruncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
        title.textContent = TruncatedTitle

        const description = document.createElement("p")
        description.textContent = article.description


        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard);

    });


}


(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    


    } catch (error) {
        console.error("Error Fetching The News", error);
    }
})();
