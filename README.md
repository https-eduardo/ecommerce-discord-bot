# 🛒 Ecommerce Discord Bot

A discord bot that works like an ecommerce, you can sell any kind of digital product to users of your discord server.
For now, pix is the unique payment method avaliable.

The API used to handle products, stocks and payments can be found here: [Pix Integration with Nest.js](https://github.com/https-eduardo/pix-integration)

![Application image](https://imgur.com/OQvwMBP.png)

### 👩‍💻 Technologies used

- Discord.js
- Typescript

### 🤙 Operational example

| Title                               |                                     Image                                      | Description                                                                                                                                                |
| :---------------------------------- | :----------------------------------------------------------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Step 1** - Creating a new product |     ![Step 1 (use command /produtos criar)](https://imgur.com/HQSDBUl.png)     | Use the command "/produtos criar" to start, then click the button.                                                                                         |
| **Step 1.1**                        |            ![product register form](https://imgur.com/cJtWfb4.png)             | After clicking the button, this form will appear, insert the data and then click to submit.                                                                |
| **Step 1.2**                        |             ![buy product message](https://imgur.com/OQvwMBP.png)              | Now, with the product channel created, people can see the details and it stock.                                                                            |
| **Step 2** - Managing stock         |         ![use command /produtos listar](https://imgur.com/fCtk5oM.png)         | Well, as our product is without stock, we need to add items to it, so, use the command "/produtos listar" and click in "Gerenciar estoque".                |
| **Step 2.1**                        |         ![selecting option "adicionar"](https://imgur.com/hItzuUx.png)         | Select the option of what you gonna do, in this case "Adicionar" to add an new item to stock.                                                              |
| **Step 2.2**                        |    ![inserting data in the stock item form](https://imgur.com/VlAu4Dr.png)     | Then, insert the information of the item that will be inserted.                                                                                            |
| **Step 3** - Buying a product       |    ![form to connect an email to user order](https://imgur.com/aJnPZxn.png)    | Now, anyone in your discord server can buy the product that you're selling. In this image, you can see the form that opens when user clicks in buy button. |
| **Step 3.1**                        |       ![order details and qr code to pay](https://imgur.com/aJnPZxn.png)       | After inserting the email, a QR code to pay the order will be generated                                                                                    |
| **Step 3.2**                        | ![email sent to buyer after paying the product](https://imgur.com/PQtt3mw.png) | After payment confirmed, the item will be sent to buyer email and removed from the stock                                                                   |

## 🚀 How to run[^1]

First of all, you'll need to set up the enviroment.

Following the `.env.example`, implement `.env` file and insert the values of variables.

[^1]: PS: You have to provide an API for handling backend, like my recommendation in the top of this text.

```bash
# development
$ yarn dev

# production mode
$ yarn start
```
