import * as vue from 'vue';
import { App } from 'vue';

declare const _default$1: vue.DefineComponent<{
    offsetTop: {};
    offsetBottom: {};
}, (_ctx: any, _cache: any) => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    offsetTop: {};
    offsetBottom: {};
}>>, {}, {}>;

interface AffixProps {
    offsetTop?: number;
    offsetBottom?: number;
    target?: () => HTMLElement | Window;
}

declare const install: (app: App) => App<any>;
declare const _default: {
    install: (app: App<any>) => App<any>;
};

export { _default$1 as Affix, type AffixProps, _default as default, install };
