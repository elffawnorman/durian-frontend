import React from 'react'
import { jsPDF } from "jspdf";
import { font } from './THSARABUNNEW-normal';
import autoTable from 'jspdf-autotable';

const Invoice = ({ order }) => {
    const handlePDF = () => {
        const doc = new jsPDF();
        // add the font to jsPDF
        doc.addFileToVFS("MyFont.ttf", font);
        doc.addFont("MyFont.ttf", "MyFont", "normal");
        doc.setFont("MyFont");

        let width = doc.internal.pageSize.getWidth();
        doc.text("ณัชพล", width / 2, 10, { align: 'center' });
        doc.text("วันที่ : xxxx", width / 2, 15, { align: 'center' });

        let data = order.products.map((p, i) => [p.product.title, p.price, p.count])

        let content = {
            startY: 20,
            head: [['รายการสินค้า', 'ราคา', 'น้ำหนัก']],
            body: data,
            styles:{font:'MyFont'}
        }

        doc.autoTable(content)

        doc.text("ยอดรวม : "+order.cartTotal,190,100,{align:'right'})

        doc.save(order.id+".pdf");

    }
    return (
        <div>
            <button onClick={handlePDF} className='btn btn-primary'>
                พิมพ์ใบเสร็จ
            </button>

        </div >
    )
}

export default Invoice