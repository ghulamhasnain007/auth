const bcrypt = require('bcrypt')

const createHash = async(plainText) => {
    try{
        const hash = await bcrypt.hash(plainText, 10)
        return hash
    }
    catch(error){
        throw error
    }
}

const compareHash = async (plainText, hashedText) =>{
    try{
        const isCompared = await bcrypt.compare(plainText, hashedText)
        return isCompared
    }
    catch(error){
        throw error
    }
}
module.exports = {
    createHash,
    compareHash
}