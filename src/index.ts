import {ILiveInterface} from './interface';
import {
    EventEnum,
    IChannelConfig,
    IMixConfig,
    IModifyMixConfig,
    IWsRtcConfig,
    WsRtc,
} from './wsrtc';
import {EventBus} from './EventBus';
import {IPushConfig} from './wsrtc/wswebrtc';

// @ts-ignore
require("./adapter.js");


export enum LiveMode {
    WsRtc,// 网宿
    Agora,// 声网
}


const WsRtcInstance = new WsRtc();

class WebLive extends EventBus implements ILiveInterface{
    protected mode:LiveMode;
    constructor(mode:LiveMode) {
        super();
        this.mode=mode;
    }
    public init(config: IWsRtcConfig): void{
        return WsRtcInstance.init(config);
    }
    public auth():Promise<boolean>{
        return WsRtcInstance.auth();
    }
    createChannel(channelConfig:IChannelConfig):Promise<any>{
        return WsRtcInstance.createChannel(channelConfig);
    }
    destroyChannel():Promise<boolean>{
        return WsRtcInstance.destroyChannel();
    }
    joinChannel(channelConfig:IChannelConfig):Promise<boolean>{
        return WsRtcInstance.joinChannel(channelConfig);
    }
    leaveChannel():Promise<boolean>{
        return WsRtcInstance.leaveChannel();
    }
    startMix():Promise<boolean>{
        return WsRtcInstance.startMix();
    }
    updateMix(mixConfig:IModifyMixConfig):Promise<boolean>{
        return WsRtcInstance.updateMix(mixConfig);
    }
    createMix(mixConfig: IMixConfig): Promise<boolean> {
        return WsRtcInstance.createMix(mixConfig);
    }
    stopMix():Promise<boolean>{
        return WsRtcInstance.stopMix();
    }
    shareDesktop():void{
        return WsRtcInstance.shareDesktop();
    }
    stopDesktop():void{
        return WsRtcInstance.stopDesktop();
    }
    play(url:string,seiCallback?:(timestamp:number)=>void,urlCallback?:(callback:Function)=>void,listener?:(eventType:EventEnum,data?:any)=>void){
        return WsRtcInstance.play(url,seiCallback,urlCallback,listener);
    }
    playMix():void{
        return WsRtcInstance.playMix();
    }
    public on(event:string,callback:any){
        return WsRtcInstance.on(event,callback);
    }
    public off(event:string,callback:any){
        return WsRtcInstance.off(event,callback);
    }
    public destroy(){
        return WsRtcInstance.destroy();
    }
    public startScreenCapture(config:IPushConfig){
        return WsRtcInstance.startScreenCapture(config);
    }
}


class SingleWebLive {
    private static instance:WebLive;
    public static getInstance(mode:LiveMode){
        if(this.instance){
            return this.instance;
        }else{
            this.instance = new WebLive(mode);
            return this.instance;
        }
    }
}

export {EventEnum} from "./wsrtc";

export {SingleWebLive}