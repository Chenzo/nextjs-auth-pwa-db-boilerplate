
import clientPromise from "../../lib/mongodb";

export default async (req, res) => {

    


    try {
        const client = await clientPromise;
        let dbName = 'stream-tools';
        if (process.env.NODE_ENV === 'development') {
          console.log('development mode for dbName');
          dbName = 'stream-tools-dev';
        } 
        const db = client.db(dbName);

        const overlayData = await db
            .collection("streamer")
            .find({})
            .limit(10)
            .toArray();

        res.json(overlayData);
    } catch (e) {
        console.error(e);
    }
};