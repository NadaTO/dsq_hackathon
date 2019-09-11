# Hackathon IAA 2019
# Continental Data Square - Monetization Framework
Welcome to the continental.cloud Hackathon.
Now that you've found your way to the github repo here are the first steps to start with.

The time is limited! You might split up your team into several roles, based on your skillset.
For example:
- Service / Backend Developer
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
1. Metamask is a light client for Ethereum. It allows for creation and managing of Ethereum wallets. Metamask is a browser extension, using Chrome, Firefox, Opera or Brave install Metamask from: https://metamask.io/
2. Once Metamask is installed it will prompt you to import or create new wallet, choose create new wallet, and choose a password for the new wallet.
3. Metamask uses a seedphrase to derive private/public key pairs (an Ethereum wallet is a private/public key pair). Use the default seedphrase that is provided by Metamask, but copy it somewhere as in the next step you are required to input the seedphrase once again for confirmation.
4. Once the wallet is created open Metamask by clicking at the browser extension situated on the toolbar on the top right. By default Metamask uses Ethereum Main Network, change this by clicking on the label, from the dropdown choose Ropsten Test Network.


### 1.2 Request Ether & XBR
1. Click the menu icon in Metamask and click add new token
2. Click Custom Token, copy paste the XBR Token address and click next.
```
**0x78890bF748639B82D225FA804553FcDBe5819576** 
```
3. From Metamask, copy your Ethereum address and paste it on the  hackathon chat.
4. We will send you Ether and XBR Token, soon you will see your Ether and XBR Token balance updated.

### 1.3 Open Payment Channel



## Task 2 - Time is money
After this task you will have a service running that sells some data on the market and earns XBR tokens for your team.
It will also provide you with data you can use for testing and developing your own service.
Only one of your team members should run this service at the same time (unless you know what you are doing).

To get it up and running the following steps are needed:
1. Clone the example code from GitLab and move to the `service/fleet-simulation` folder.
2. Build the docker container by running `docker build -t fleet-simulation .` (don't forget the dot at the end!).
3. Modify the env.list file with the required settings. You will need the delegate's private key from the first task and your login credentials to the service router.
4. Start the docker container via the `docker run -it --env-file env.list fleet-simulation`.
5. Check the output to see if your data gets bought.

## Task 3 - Become a service provider
Upon completion of this task your team will have a service running that buys some data from the fleet simulation and sells something of your chosing to interested parties.
It will also be useful for providing a service to enhance the life of your persona.

To accomplish this task you will need to do the following:
TODO!

## Task 4 - Develop vehicle app
The goal of this task is to develop an HMI application that shows up on the vehicle demonstrator.
This app should be an HTML5 application that automatically gets deployed on code check-in into the GitLab server.
It should fulfill the needs of a chosen persona with the help of data provided by your backend service.

The following steps are needed to get it running:
TODO!
