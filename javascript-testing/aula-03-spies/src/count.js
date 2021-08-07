exports.countDownZombies = function (count) {
    if(count == 1) {
        console.log(`${count}...`)
        return console.log('The zombies are comming!!! Get ready!!!')
    }
    console.log(`${count}...`)
    return this.countDownZombies(count - 1)
}