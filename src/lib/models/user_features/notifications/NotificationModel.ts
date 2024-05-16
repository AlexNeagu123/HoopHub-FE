import FanInfo from "../fans/FanInfo";
import { NotificationType } from "./NotificationType";

export default class NotificationModel {
    public id: string = "";
    public recipient: FanInfo = new FanInfo();
    public sender: FanInfo | null = null;
    public type: NotificationType = NotificationType.Unauthorized;
    public isRead: boolean = false;
    public title: string = "";
    public content: string = "";
    public attachedImageUrl: string | null = null;
    public attachedNavigationData: string | null = null;
    public createdDate: Date = new Date();
}