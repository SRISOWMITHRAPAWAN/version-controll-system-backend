const { MongoClient }=require("mongodb");

module.exports ={
    selecteddb:{},
   async connect () {
        try{
          const client = await MongoClient.connect(process.env.MONGODB_URL)
          this.selecteddb= client.db("useAuth")
    //   console.log(this.selecteddb)
        } catch(err){
            console.log(err);
        }
    },
};