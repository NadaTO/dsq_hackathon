# Hackathon IAA 2019
# Continental Data Square - Monetization Framework
Welcome to the continental.cloud Hackathon.
Now that you've found your way to the github repo here are the first steps to start with.

The time is limited! You might split up your team into several roles, based on your skillset.
For example:
- Service / Backend developer
- HMI Developer 
- Designer
- Presentation & Business

How to start your work is dependent on your role. Here is what we have to help you with this.
If you have any questions you can always ask our experts or team guides to help you.

## Basic component architecture
Each team in the hackathon will create microservices. These microservices publish to topics that can be subscribed to. The publishing and subscribing happens through the service router.

The service router can be found at: **wss://dataplane.dmp.be.continental.cloud:8081/ws**

All teams share the service router, however each team is allocated a realm within the service router. Topics are categorized under realms, no two topics should have the same name under a realm.

Depending on your team, the realm allocated to your team is as follows:

1. Team 1: realm1
2. Team 2: realm2
3. Team 3: realm3
4. Team 4: realm4

To connect to the realm a password is necessary, which is provided by the group leader.

## Chat system

Exchange code snippets or information in a rocket chat - join **http://chat.dmp.be.continental.cloud**

## Continous Integration

You can use the preapred Gitlab CI setup to deploy your HTML5 application to the destination.
Please rename the file accordingly. Only commits on MASTER will be deployed.

## Task 1 - Get ready to earn
After following this section a team will have their own Ethereum wallet with ether and XBR tokens, which are necessary for the participation of the hackathon. The major steps are:
1. Setup Metamask
2. Request Ether & XBR
3. Open Payment Channel


### 1.1 Setup Metamask
1. Metamask is a ligh client for Ethereum. It allows for creation and managing of Ethereum wallets. Metamask is a browser extension, using Chrome, Firefox, Opera or Brave install Metamask from: https://metamask.io/
2. Once Metamask is installed it will prompt you to import or create new wallet, choose create new wallet, and choose a password for the new wallet.
3. Metamask uses a seedphrase to derive private/public key pairs (a Ethereum wallet is a private/public key pair). Use the default seedphrase that is provided by Metamask, but copy it somewhere as in the next step you are required to input the seedphrase once again for confirmation. 
4. Once the wallet is created open Metamask by clicking at the browser extension situated on the toolbar on the top right. By default Metamask uses Ethereum Main Network, change this by clicking on the label, from the dropdown choose Ropsten Test Network.


### 1.2 Request Ether & XBR
1. Click the menu icon in Metamask and click add new token
2. Click Custom Token, copy paste the XBR Token address and click next.
3. From Metamask, copy your Ethereum address and paste it on the  hackathon chat.
4. We will send you Ether and XBR Token, soon you will see your Ether and XBR Token balance updated.

### 1.3 Open Payment Channel



## Task 2 - ??


// Maybe we should provide a readme for every of the 4 tasks
