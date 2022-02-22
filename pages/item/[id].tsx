import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import {Button, Image, Header, Loader,Dimmer,  Segment} from "semantic-ui-react";
import Head from "next/head";
import styles from "../../styles/ListItem.module.css";
import Link from "next/link";

const ItemPage = () => {
    const [item, setItem] = useState({
        image_link: undefined,
        name: undefined,
        price:undefined,
        description:undefined,
        product_type:undefined,
        category:undefined
    })
    const [isLoading, setLoading] = useState(true);

    const router = useRouter()
    const {id} = router.query
    const API_URL =
        `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`
    async function getItemData() {
        const res = await fetch(API_URL)
        setLoading(false);
        return res.json()
    }
    useEffect(() => {
        if(id){
            getItemData()
                .then(res => {
                    setItem(res)
                })
        }

    }, [id])
    return(
        <>
            {
                isLoading? (
                    <div style={{padding: "300px 0"}}>
                        <Loader inline="centered" active>
                            Loading
                        </Loader>
                    </div>
                ):(
                    <>
                    <div className={styles.container}>
                        <Head>
                            <title>Item | {item.name}</title>
                            <link rel="icon" href="/favicon.ico" />
                        </Head>
                        <div>
                            <Image className={styles.img_item} src={item.image_link} alt={item.name} height={150}
                                   width={150}/>
                        </div>
                        <div className={styles.info_item}>
                            <h3 className={styles.tit_item}>{item.name}</h3>
                            <span className={styles.txt_info}>
                                {item.category ? `${item.category}/` : ""}
                                {item.product_type}
                            </span>
                            <h1 className={styles.num_price}>$ {item.price}</h1>
                            <button className={styles.getButton}>구매하기</button>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <Header as="h3">Description</Header>
                        <h5>{item.description}</h5>
                    </div>
                    <div className={styles.backToHome}>
                        <Link href="/">
                            <a>← Back to home</a>
                        </Link>
                    </div>
                    </>
                )}

        </>
    )
}

export default ItemPage;