class Index {
    constructor() {
        this.declareServiceWorker()

        window.addEventListener("load", (event) => {
            this.listenInputChange()
            this.lazyloadIframe()
        });
    }

    listenInputChange(){
        document.querySelector('.search input').addEventListener('change', (event) => {
            const search = event.target.value;
            this.findAnime(search)
        });
    }

    findAnime(search){
        document.querySelectorAll('.animes h2').forEach(($el) => {
            $el.closest('.animes').classList.remove('hidden');

            console.log($el.textContent);

            if(!$el.textContent.toLowerCase().includes(search.toLowerCase())){
                $el.closest('.animes').classList.add('hidden');
            }
        })
    }

    lazyloadIframe(){
        if(!LazyLoad){
            return;
        }
        
        const lazyLoadInstance = new LazyLoad({
            // Your custom settings go here
        });
    }

    declareServiceWorker(){
        console.log("test")
        if ("serviceWorker" in navigator) {
            // Puis on déclare celui-ci
            // via la fonction `register`
            
            navigator.serviceWorker
              .register("/service-worker.js")
              .then(registration => {
                // On a réussi ! Youpi !
                console.log(
                  "App: Achievement unlocked."
                );
              })
              .catch(error => {
                // Il y a eu un problème
                console.error(
                  "App: Crash de Service Worker",
                  error
                );
              });
          }
    }
}

new Index();