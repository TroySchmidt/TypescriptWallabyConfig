import createRouter from 'router5';
import listenersPlugin from 'router5/plugins/listeners';
import browserPlugin from 'router5/plugins/browser';
import routes from '../routes';

export default function configureRouter(useListenersPlugin: boolean = false) {
    const router = createRouter(routes, {
            defaultRoute: 'home'
        })
        // Plugins
        .usePlugin(browserPlugin({
            useHash: true
        }));

    if (useListenersPlugin) {
        router.usePlugin(listenersPlugin());
    }

    return router;
}