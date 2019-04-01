import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WebinarsService } from '../http_services/webinars.service';
import { SpeakersService } from '../http_services/speakers.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-admin-webinars',
  templateUrl: './admin-webinars.component.html',
  styleUrls: ['./admin-webinars.component.css']
})

export class AdminWebinarsComponent implements OnInit {
  newQuestions: number = 0;
  newAnswers: number = 0;
  speaker: any = {title: "Dr.", firstName: "", lastName: "", description: "", img: ""};
  stage: number = 1;
  newWebinar: any = {title: "", datetime: new Date(), description: "", speaker: "", video_link: "", quiz: []}
  webinars: any;
  speakers: any;
  newSpeaker: any = {title: "Dr.", firstName: "", lastName: "", description: "", img: ""}
  constructor(
    public sanitizer: DomSanitizer,
    private _webinarsService: WebinarsService,
    private _speakersService: SpeakersService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this.getWebinars();
    this.getSpeakers();
  }

  getWebinars(){
    let obs = this._webinarsService.getWebinars();
    obs.subscribe(data => this.webinars=data)}
  addWebinar(){
    this.newWebinar.speaker = this.speaker;
    let obs = this._webinarsService.addWebinar(this.newWebinar);
    obs.subscribe(data =>{
      console.log(data);
      this.getWebinars();
      this.newWebinar = this.newWebinar = {title: "", datetime: new Date(), description: "", speaker: "", video_link: "", quiz: []};
    })
  }
  stage1(){
    this.stage=1;
  }
  stage2(){
    this.stage=2;
    console.log(this.newWebinar.datetime);
  }
  stage3(){
    this.stage=3;
    let obs = this._speakersService.getSpeaker(this.newWebinar.speaker);
    obs.subscribe(data => this.speaker = data);
  }  
  //3 next functions are to allow model binding with datetime-local input
  private parseDateToStringWithFormat(date: Date): string {
    let result: string;
    let dd = date.getDate().toString();
    let mm = (date.getMonth() + 1).toString();
    let hh = date.getHours().toString();
    let min = date.getMinutes().toString();
    dd = dd.length === 2 ? dd : "0" + dd;
    mm = mm.length === 2 ? mm : "0" + mm;
    hh = hh.length === 2 ? hh : "0" + hh;
    min = min.length === 2 ? min : "0" + min;
    result = [date.getFullYear(), '-', mm, '-', dd, 'T', hh, ':', min].join('');
    return result;
  }

  public set dateTimeLocal(v: string) {
    let actualParsedDate = v ? new Date(v) : new Date();
    let normalizedParsedDate = new Date(actualParsedDate.getTime() + (actualParsedDate.getTimezoneOffset() * 60000));
    this.newWebinar.datetime = normalizedParsedDate;
  }

  public get dateTimeLocal(): string {
    return this.parseDateToStringWithFormat(this.newWebinar.datetime);
  }
  addMultipleQuestions(){
    for (let i = 0; i < this.newQuestions; i++){
      this.newWebinar.quiz.push({question: "", right_answer: "", wrong_answers: Array(this.newAnswers).fill("")});
    } 
    this.newQuestions = 0;
    this.newAnswers = 0;
  }
  addQuestion(){
    this.newWebinar.quiz.push({question: "", right_answer: "", wrong_answers: [""]})
  }
  addAnswer(index){
    this.newWebinar.quiz[index].wrong_answers.push("");
    console.log(index);
    console.log(this.newWebinar)
  }
  deleteQuestion(i){
    this.newWebinar.quiz.splice(i, 1)
  }
  deleteAnswer(i){
    this.newWebinar.quiz[i].wrong_answers.pop();
  }
  getSpeakers(){
    let obs = this._speakersService.getSpeakers();
    obs.subscribe(data => this.speakers=data)}
  addSpeaker(){
    let obs = this._speakersService.addSpeaker(this.newSpeaker);
    obs.subscribe(data => {
      console.log(data);
      this.getSpeakers();
      this.newWebinar.speaker = data['_id'];
      this.newSpeaker = {title: "Dr.", firstName: "", lastName: "", description: "", img: "", webinars: []};
    })
  }
}