import { Grid, Image } from 'semantic-ui-react'
import styles from "../styles/ListItem.module.css";
import Link from 'next/link'
import React from "react";
interface Seller {

}
type item = {
    name ?: string;  // FunctionComponent.
    category ?: string;
    price ?: number;
    seller : Seller;
}

// interface itemList extends Array <item>{
//
// }
type itemListProps = {
    list:item[]
}
const ItemList:React.FC<itemListProps>=({list}) =>{
    console.log("리스트 "+ JSON.stringify(list))
    return(
        <>
            <Grid columns={3} divided>
                <Grid.Row>
                    {list.map((item : any)=>(
                            <Grid.Column key={item.id}>
                                <Link href={`./item/${item.id}`}>
                                <div className={styles.itemDataBox}>
                                    <Image className={styles.img_item} src={item.image_link} height={100}
                                           width={100} alt={item.name} />
                                    <strong className={styles.tit_item}>{item.name}</strong>
                                    <span className={styles.txt_info}>
                                        {item.category} {item.product_type}
                                    </span>
                                    <strong className={styles.num_price}>$ {item.price}</strong>
                                </div>
                                </Link>
                            </Grid.Column>
                        )
                    )}
                </Grid.Row>
            </Grid>
        </>
    )
}
export default ItemList;