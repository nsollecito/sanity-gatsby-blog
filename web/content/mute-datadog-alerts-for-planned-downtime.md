---
date: 2021-02-16T02:38:15Z
_id: 'e0a739cf-1d71-42c2-9544-bc69f19de109'
_rev: '2bakqX8eU47Kx7vuashulh'
_type: 'post'
lastmod: 2021-02-25T03:53:25Z
blog: /blog/engineering
categories: ['Structured content']
excerpt: Learn how muting alerts during planned downtime can help you more easily identify the most critical issues that may be occurring in your environment.
image: 'https://cdn.sanity.io/images/amu3cvo8/production/edde9b2853110f3711a8a2ae812a373c5faaa06f-3002x1279.png?w=600'
publishDate: 2021-02-25T21:00:00.000Z
slug: 'mute-datadog-alerts-for-planned-downtime'
title: 'Mute Datadog alerts for planned downtime'
---

We're happy to announce the release of new muting features for Datadog monitors. Scoped monitor muting allows teams to eliminate unnecessary alerting during scheduled maintenance, testing, auto scaling events, and instance reboots. Your teams will therefore be able to filter out expected events and quickly pinpoint critical issues in your infrastructure.  


### Mute monitors by tag  
  
Previously, monitor muting was binary: all-or-nothing. With this release, you can take advantage of [Datadog tagging](https://docs.datadoghq.com/faq/#tagging) to mute specific scopes of a monitor on an ad hoc basis.  
{{< img src="select-muting.png" alt="Planned downtime" caption="Mute by scope within a monitor's status page" >}}  
  
### Schedule global mute settings with monitor downtiming  
  
In addition to muting individual monitors over specific scopes, you can also schedule global downtime during a specific time window to suppress all alerting related to a tag.

  
{{< img src="schedule-downtime.png" alt="Planned downtime" popup="true" caption="Scope your planned downtime selection based on tags" >}}  
For instance, if you had a planned maintenance window starting at 1am on Sunday, scheduling downtime would prevent a high volume of alerts as you bounce or redeploy the various services and instances in your environment. Plus, your team would be able to anticipate scheduled maintenance via Datadog's event notifications and plan accordingly.  
  
{{< img src="downtime-list.png" alt="Planned downtime" caption="Set planned Downtime periods to mute alerts across the infrastructure" >}}  
  
### Automatic monitor downtiming for expected instance shutdowns  
  
Datadog also proactively mutes monitors in response to planned downtime in certain situations. For example, monitors related to the manual reboot or shutdown of AWS instances are automatically muted, based on host statuses available via the Cloudwatch API. Instance shutdowns that are triggered by AWS's auto scaling feature are muted by Datadog as well.  
Check out our [API docs](https://docs.datadoghq.com/api/#downtimes) for more information on integrating this feature into your monitoring coverage. If you're not currently a Datadog customer, you can sign up for a <ahref="#"class="sign-up-trigger">14-day free trial</a> of Datadog and check out this feature for yourself. Your inbox and pager will thank you for it.