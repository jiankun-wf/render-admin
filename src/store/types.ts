import { IAsyncRouteState } from '@/store/modules/asyncRoute';
import { IUserState } from '@/store/modules/user';
import { ITabsViewState } from '@/store/modules/tabsView';

export interface IStore {
  asyncRoute: IAsyncRouteState;
  user: IUserState;
  tabsView: ITabsViewState;
  count: number;
}
