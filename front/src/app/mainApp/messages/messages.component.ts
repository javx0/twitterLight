import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChatService } from 'src/app/services/chat/chat.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Chat } from 'src/app/models/chat';
import { Message } from 'src/app/models/message';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  modalRef?: BsModalRef;
  protected newChatName = new FormControl();
  protected newChatMessage = new FormControl();
  protected newChatParticipant = new FormControl();

  chatList: Chat[];
  messagesList: Message[];
  chatSelected: Chat;
  username = "";
  
  constructor(private modalService: BsModalService, private chatService: ChatService, private userService: UserService){
    this.chatSelected = <Chat>{"id":-1,"name":"ningunChatSelecionado"};
    this.chatList = [];
    this.getChats();

    this.messagesList = [];
    this.getMyUser();
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createChat(){
    this.chatService.createChat(this.newChatName.value).subscribe(response =>{
      this.getChats();
    })
  }

  getChats(){
    this.chatService.getChats().subscribe(response =>{
      this.chatList = response;
    })
  }

  selectChat(chat:Chat){
    this.chatSelected = chat;
    this.getChatMessages(chat.id);
  }

  getChatMessages(idChat:number){
    this.chatService.getChatMessages(idChat).subscribe(response => {
      this.messagesList = response;
    })
  }

  sendMessage(){
    this.chatService.sendMessage(this.chatSelected.id, this.newChatMessage.value).subscribe(response => {
      this.getChatMessages(this.chatSelected.id);
    });
    this.newChatMessage.reset();
  }

  postChatMessage(){
    this.chatService.sendMessage(this.chatSelected.id, this.newChatMessage.value).subscribe(response => {
      this.getChatMessages(this.chatSelected.id);
    });
  }

  addUser(){
    this.chatService.addUserToChat(this.chatSelected.id, this.newChatParticipant.value).subscribe(res =>{
      
    })
  }

  getMyUser(){
    this.userService.getMyUser().subscribe(response =>{
        this.username = response;
      }
      )
  }

}
