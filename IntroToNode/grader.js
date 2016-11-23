var scores = [90, 98, 89, 100, 100, 86, 94];

console.log(Math.round(average(scores)));

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

console.log(Math.round(average(scores2)));

function average(scores){
    
    var total = 0;
    
    scores.forEach(function(score) {
        
        total += score;
    })
    
    var avg = total/scores.length;
    
    return avg;
}