import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import {json} from "stream/consumers";
import {Button, Image,} from "semantic-ui-react";
import Head from "next/head";
import styles from "../../styles/ListItem.module.css";
import Link from "next/link";

const ItemPage = () => {
    const [item, setItem] = useState({
        image_link: undefined, name: undefined, price:undefined, description:undefined})
    const router = useRouter()
    const {id} = router.query
    const API_URL =
        `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`
    console.log("라라ㅏ라"+API_URL)
    async function getItemData() {
        const res = await fetch(API_URL)
        return res.json()
    }
    useEffect(() => {
        if(id){
            getItemData()
                .then(res => {
                    setItem(res)
                    // console.log("flflflf"+JSON.stringify(res))
                })
        }

    }, [id])
    return(
        <div className={styles.container}>
            <Head>
                <title>Item | {item.name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Image className={styles.img_item} src={item.image_link} alt={item.name} height={150}
                     width={150}/>
            </div>
            <div>
                <h3 className={styles.tit_item}>{item.name}</h3>
                <h1 className={styles.num_price}>$ {item.price}</h1>
            </div>
            <div>
                <h5 className={styles.description}>{item.description}</h5>
            </div>

            <button className={styles.getButton}>구매하기</button>

            <div className={styles.backToHome}>
                <Link href="/">
                    <a>← Back to home</a>
                </Link>
            </div>

        </div>

    )
}

export default ItemPage;