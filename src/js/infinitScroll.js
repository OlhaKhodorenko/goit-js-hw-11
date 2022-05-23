
const callback = entries =>{
    entries.forEach(entry => {
        console.log(entry);// Here we can do something with each particular entry
    });  
}

const options ={};
const observer = new IntersectionObserver(callback, options);
  
  // Now we should tell our Observer what to observe
  observer.observe(document.querySelector('.sentinel'));