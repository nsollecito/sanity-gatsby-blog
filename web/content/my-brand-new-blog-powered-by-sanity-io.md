---
date: 2019-03-29T11:02:17Z
_id: 'fb5f90f7-7980-4b2a-b9da-35cd0a23829a'
_rev: 'lIX2YGW514RC2125qdQKQj'
_type: 'post'
lastmod: 2021-03-06T03:45:10Z
authors: 
- name: My Name
  slug: my-name
blog: '/blog/engineering'
categories: ['Structured content','Categorical advice']
excerpt: Congratulations to me! I now have a blog powered by Hugo and Sanity.io.
image: 'https://cdn.sanity.io/images/eazrcs7l/production/601ec1ad78c0c86575a82ef3a6f6442aa10a169a-1504x1000.png?w=600'
publishDate: 2021-03-02T03:24:20.000Z
slug: 'my-brand-new-blog-powered-by-sanity-io'
title: 'My brand new blog powered by Sanity.io'
---

Dogs provide valuable information for troubleshooting application performance issues. But as your application scales and generates more logs, sifting through them becomes more difficult. Your logs may not provide enough context or human-readable data for understanding and resolving an issue, or you may need more information to help you interpret the IDs or error codes that application services log by default.  
Datadog's [Enrichment Tables][table-docs] enable you to enrich logs with your own business-critical data, automatically providing more contextual information for quickly resolving application issues. Each table includes a primary key—an ID or code that appears as a field in your logs, such as an organization ID or a status code—and additional business data associated with that key. For example, the Enrichment Table below uses the merchant ID found in application logs as the primary key and maps each ID to a specific merchant name and point of contact.  
{{< img src="enrichment_tables_v2.png" alt="Add context to your logs" border="true" caption="Create a new Enrichment Table to map customer and merchant data to IDs in your logs" popup="true">}}  
To create a new table in Datadog, you can [upload][table-upload-docs] a comma-separated value file (CSV) and select which column you want to use as the primary key. You can then use the table with a [Lookup Processor][lookup-docs] to enrich your logs, as seen in the example processor below.  
  
{{< img src="enrichment_tables_lookup_processor_v2.png" alt="Use the Lookup Processor to apply Enrichment Tables to your logs" border="true" popup="true">}}  
The Lookup Processor uses the `Merchant_Details` Enrichment Table to map each Merchant ID (i.e., the primary key) found in the `shopist.webstore.merchant.display_id` log attribute to a new `merch_detail` attribute. With this configuration, Datadog will automatically add merchant names and points of contact to incoming logs as new attributes, which you can use as facets to search and analyze your logs as well as [build dashboards](https://www.datadoghq.com/blog/log-analytics-dashboards/) to get a better picture of log activity.  
In this guide, we'll show you how you can use Enrichment Tables to:  
-[organize logs by logical units (e.g., team, organization division, cost center, merchant)](#connect-application-service-logs-to-specific-units)-[map error codes to descriptive error messages](#troubleshoot-more-efficiently-with-error-code-mapping)  
## Connect application service logs to specific unitsMany organizations group their application services by hierarchy (e.g., team, department, cost center). This allows stakeholders to focus on monitoring and managing specific parts of the application. You can use Enrichment Tables to automatically map service logs to specific groups within your organization and use that data to build dashboards for better visibility into critical, revenue-generating applications. For example, you can use a dashboard to monitor transactions broken down by application service or strategic business unit (SBU).  
{{< img src="enrichment_tables_dash.png" alt="Create dashboards to monitor your critical data sets" border="true" popup="true">}}  
You can also create a table to automatically connect business data with IDs in your service logs, such as merchant IDs, providing more context for faster troubleshooting. For example, you can quickly isolate transaction issues to a specific merchant portal or customer account. The example error log below provides contact information for a merchant portal that failed to process a transaction.  
{{< img src="enrichment_tables_log.png" alt="Troubleshoot logs with Enrichment Tables" border="true" popup="true">}}  
## Troubleshoot more efficiently with error code mappingWhen an application generates an error, it logs a code to reflect the severity or type of error. But each application service may generate its own custom error codes, making it more difficult to pinpoint the issues that generated the errors. Teams need the ability to quickly assess an error without memorizing hundreds of codes. You can use Enrichment Tables to map error codes to descriptive error messages, making them more actionable for your team and key stakeholders who need better visibility into the state of their services. The example table below automatically maps standard Linux error codes to the appropriate error name and message.  
  
{{< img src="enrichment_tables_error_mapping_2.png" alt="Use Enrichment Tables to create custom tables for capturing issues" border="true" popup="true">}}  
You can also add custom codes and error messages for your application services. Once you [connect the table with a log pipeline][table-docs], Datadog will automatically add the error name and message to all incoming logs that match the pipeline's filter. Once your logs are enriched with descriptive error messages, you can spend more time investigating an issue with an application service, instead of researching error codes. ## Keep your tables up to dateWith Enrichment Tables, you can bring operational and transactional data together to streamline workflows. To manage larger datasets, or reference data that changes over time, you can link your tables to cloud buckets such as Amazon S3 to automatically keep them up to date—support for Azure Storage and Google Cloud Storage is coming soon. This method supports tables of up to 200MB and ensures that they always have the latest data any time the underlying CSV file is modified.  
{{< img src="enrichment_tables_cloud_bucket_v3.png" alt="Create an enrichment table from a cloud bucket" border="true" popup="true">}}  
Contact [support][support] to sign up for the beta and start using Enrichment Tables today, or check out our [documentation][table-docs] to learn more. If you don't already have a Datadog account, you can sign up for a <ahref="#"class="sign-up-trigger">free trial</a> today.  
[table-docs]: https://docs.datadoghq.com/logs/guide/enrichment-tables/[lookup-docs]: https://docs.datadoghq.com/logs/processing/processors/?tab=ui#lookup-processor[table-upload-docs]: https://docs.datadoghq.com/logs/guide/enrichment-tables/#create-an-enrichment-table[support]: https://docs.datadoghq.com/help/