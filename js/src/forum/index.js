/*
 * This file is part of justoverclock/flarum-ext-newsfeed.
 *
 * Copyright (c) 2021 Marco Colia.
 * https://flarum.it
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import RSS from 'vanilla-rss';
import app from 'flarum/app';

app.initializers.add('justoverclock/flarum-ext-newsfeed', () => {
  extend(IndexPage.prototype, 'view', function (vdom) {
    if (vdom.children && vdom.children.splice) {
      const insert = m('div', { className: 'NewsFeed', id: 'divRss' });
      vdom.children.splice(1, 0, insert);
    }
  });
});
extend(IndexPage.prototype, 'oncreate', function () {
  const FeedUrl = app.forum.attribute('FeedUrl');
  const rss = new RSS(document.querySelector('#divRss'), FeedUrl, {
    limit: 5,
    ssl: true,
    layoutTemplate: "<div class='feed-container'>{entries}</div>",
    entryTemplate: "<li class='licss'><a class='titleFeed' href=\"{url}\">{title}</a><br/>{shortBodyPlain}... -  <b>{author}</b></li>",
  });
  rss.render().then(() => {});
});
