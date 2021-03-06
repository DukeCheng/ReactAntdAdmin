import { menus } from '@/router/menu';
import mobx, { action, autorun, computed, makeAutoObservable, observable } from 'mobx';

import { AppStore } from '.';

interface NoticeMessage {
    type: string;
    message: string;
}
export class UIStore {
    // side收起/展开
    @observable
    siderCollapsed: boolean = false;

    @observable
    isAuthorized: boolean = false;

    @observable
    loading?: boolean = false;

    @observable
    notice?: NoticeMessage

    @observable
    token: string = sessionStorage.getItem('token') || ''

    appStore!: AppStore;

    @observable
    expires_in = 0

    @observable
    user_name: string = "unknow"

    @observable tags: any[] = [];

    @observable activeTag: string = ''

    constructor(appStore: AppStore) {
        this.appStore = appStore
        makeAutoObservable(this);
        this.refreshIsAuthorized();
        const { title, path } = menus[0];
        this.tags.push({ title, path })
        autorun(() => console.log("UIStore AutoRun IsAuthorized: " + this.isAuthorized));
        autorun(() => console.log("UIStore AutoRun siderCollapsed: " + this.siderCollapsed));
        autorun(() => console.log("Tag Counts:" + this.tagCount));
    }

    @action
    setSiderCollapse(value: boolean) {
        this.siderCollapsed = value;
    }

    @action
    reset() {
        this.loading = false;
        this.notice = undefined;
    }

    @action
    startLoading() {
        this.loading = true;
    }

    @action
    stopLoading() {
        this.loading = false;
    }

    @action
    showNotice(notice: NoticeMessage) {
        this.notice = notice
    }

    @action
    removeNotice() {
        this.notice = undefined
    }

    @action
    setToken(value: string) {
        this.token = value
        sessionStorage.setItem('token', value)
        this.refreshIsAuthorized();
    }
    @action
    removeToken() {
        this.token = ''
        sessionStorage.removeItem('token')
        this.refreshIsAuthorized();
    }

    @action
    refreshIsAuthorized() {
        this.isAuthorized = sessionStorage.getItem('token') !== null;
    }

    @action
    setExpires(value: number) {
        this.expires_in = value
    }

    @computed get tagCount() {
        return this.tags.length;
    }

    @action
    addTag(tag: any) {
        let isContainPath = false;

        // 检查是否已存在path
        var i = this.tags.length;
        while (i--) {
            if (this.tags[i].path === tag.path) {
                isContainPath = true;
                break;
            }
        }

        if (!isContainPath) {
            this.tags.push(tag);
        }
        this.activeTag = tag.path;
    }
    @action
    removeTag(tagKey: string) {
        this.tags.forEach(function (item, index, arr) {
            if (item.path === tagKey) {
                arr.splice(index, 1);
            }
        });
    }
}