# Original catalog vs. workforce server: argument schema comparison

Source: read-only capture of the 172 original tool definitions on 11/17/2026 (`source-schemas/connector-172.json` in the QA evidence folder), compared with this server's live `tools/list`.

| Tool | Status | Original params the server lacks | Server params not in original |
|---|---|---|---|
| `add_eval_test_case_rule` | DIFF | orig-only: check_ids,resource_id,resource_type | server-only: rule |
| `add_knowledge_rows` | MATCH |  |  |
| `add_performance_dashboard_rule` | DIFF | orig-only: check_ids,config_id,resource_id,resource_type | server-only: dashboard_id,rule |
| `add_tool_step` | DIFF | orig-only: studio_id | server-only: tool_id |
| `attach_mcp_server_to_agent` | DIFF | orig-only: default_tool_approval,mcp_server_config_id,tool_approval_overrides | server-only: server_name,tools |
| `attach_tools_to_agent` | DIFF | orig-only: action_behaviour,oauth_account_ids |  |
| `bulk_delete_tools` | MATCH |  |  |
| `cancel_agent_task` | MATCH |  |  |
| `cancel_eval_batch` | DIFF | orig-only: eval_batch_id,resource_id,resource_type | server-only: batch_id |
| `cancel_tool_run` | MATCH |  |  |
| `cancel_workforce_task` | MATCH |  |  |
| `check_api_key_availability` | DIFF | orig-only: providers | server-only: keys |
| `check_tool_integration_requirements` | DIFF | orig-only: agent_id,tool_ids | server-only: tool_id |
| `clone_marketplace_listing` | MATCH |  |  |
| `clone_public_tool` | DIFF | orig-only: source_project,source_region,studio_id | server-only: name,template_id |
| `create_agent` | DIFF | orig-only: runtime_engine | server-only: folder_id,knowledge_ids,model,settings,tool_ids |
| `create_alarm` | DIFF | orig-only: auto_diagnose,channels,condition_config,cooldown_minutes,enabled,resource_id,resource_type,skip_recovery_alert,source_config,trigger_id,type | server-only: comparison,metric,target_id,threshold,window_hours |
| `create_eval_alarm` | MATCH |  |  |
| `create_eval_check` | DIFF | orig-only: check_config,resource_id,resource_type | server-only: rubric,target_id,type,value |
| `create_eval_test_case` | DIFF | orig-only: check_ids,resource_id,resource_type,tool_simulation_config | server-only: expected,input |
| `create_eval_test_set` | DIFF | orig-only: resource_id,resource_type,tool_simulation_config | server-only: description,target_id |
| `create_knowledge_set` | DIFF | orig-only: display_name,knowledge_set | server-only: columns,name |
| `create_performance_dashboard` | DIFF | orig-only: check_ids,enabled,evaluation_delay_minutes,resource_id,resource_type,sample_rate,task_status | server-only: description,target_id |
| `create_tool` | DIFF | orig-only: emoji,output_schema,params_schema,prompt_description,state_mapping,title,transformations | server-only: folder_id,inputs,name,output,steps |
| `create_tool_from_transformation` | DIFF | orig-only: description,force_create,title | server-only: name,params |
| `create_trigger` | DIFF | orig-only: agent_id,document_id,trigger_config,trigger_type | server-only: config,message,target_id,target_type,type |
| `create_workforce` | DIFF | orig-only: agents,conditions,tools,triggers | server-only: folder_id,nodes |
| `delete_agent` | MATCH |  |  |
| `delete_alarm` | DIFF | orig-only: resource_id,resource_type,trigger_id,type |  |
| `delete_eval_alarm` | MATCH |  |  |
| `delete_eval_batch` | DIFF | orig-only: eval_batch_id,resource_id,resource_type | server-only: batch_id |
| `delete_eval_check` | DIFF | orig-only: resource_id,resource_type |  |
| `delete_eval_test_case` | DIFF | orig-only: resource_id,resource_type |  |
| `delete_eval_test_set` | DIFF | orig-only: delete_test_cases,resource_id,resource_type |  |
| `delete_folder` | MATCH |  |  |
| `delete_knowledge_columns` | DIFF | orig-only: fields | server-only: columns |
| `delete_knowledge_rows` | DIFF | orig-only: document_ids | server-only: row_ids |
| `delete_knowledge_set` | MATCH |  |  |
| `delete_performance_dashboard` | DIFF | orig-only: config_id,resource_id,resource_type | server-only: dashboard_id |
| `delete_pre_publish_config` | DIFF | orig-only: resource_id,resource_type | server-only: target_id |
| `delete_tool` | MATCH |  |  |
| `delete_trigger` | DIFF | orig-only: document_id | server-only: trigger_id |
| `delete_workforce` | MATCH |  |  |
| `detach_mcp_server_from_agent` | DIFF | orig-only: mcp_server_config_id | server-only: server_name |
| `detach_tools_from_agent` | DIFF | orig-only: chain_ids | server-only: tool_ids |
| `edit_agent_system_prompt` | DIFF | orig-only: edits,expected_line_count,variable,version_description,version_name | server-only: new_string,old_string |
| `export_knowledge` | DIFF | orig-only: export_extension,export_type,page_size,select_fields,wide_format_field | server-only: file_path,format |
| `get_agent` | DIFF | orig-only: summary,version |  |
| `get_agent_task_metadata` | DIFF | orig-only: agent_id |  |
| `get_agent_task_summary` | DIFF | orig-only: agent_id |  |
| `get_agent_tools` | DIFF | orig-only: version,workforce_context |  |
| `get_agent_version` | DIFF | orig-only: compare_to,version_id | server-only: agent_id,version |
| `get_alarm` | DIFF | orig-only: resource_id,resource_type |  |
| `get_analytics_agent_activity_timeseries` | DIFF | orig-only: agent_ids,end_date,start_date | server-only: agent_id,days |
| `get_analytics_errors` | DIFF | orig-only: agent_ids,cursor,end_date,page_size,resource_type,start_date,timezone,workforce_ids | server-only: days,limit |
| `get_analytics_resource_breakdown` | DIFF | orig-only: end_date,resource_ids,resource_type,start_date | server-only: days |
| `get_analytics_task_status_counts` | DIFF | orig-only: agent_ids,end_date,start_date | server-only: days,target_id |
| `get_analytics_usage_breakdown` | DIFF | orig-only: end_date,metric,resource_type,start_date | server-only: days |
| `get_analytics_usage_timeseries` | DIFF | orig-only: agent_ids,end_date,metric,start_date | server-only: days |
| `get_bulk_run` | DIFF | orig-only: rows,rows_after |  |
| `get_eval_batch_summary` | DIFF | orig-only: eval_batch_id,resource_id,resource_type | server-only: batch_id |
| `get_eval_test_case` | DIFF | orig-only: resource_id,resource_type |  |
| `get_eval_test_set` | DIFF | orig-only: resource_id,resource_type |  |
| `get_knowledge_row` | DIFF | orig-only: document_id | server-only: row_id |
| `get_knowledge_set` | MATCH |  |  |
| `get_latest_tool_run` | DIFF | orig-only: studio_id | server-only: tool_id |
| `get_marketplace_listing` | MATCH |  |  |
| `get_performance_dashboard_timeseries` | DIFF | orig-only: check_id,config_id,end_date,resource_id,resource_type,start_date,timezone | server-only: dashboard_id,days |
| `get_pre_publish_status` | DIFF | orig-only: check_id,page,page_size,resource_id,resource_type,version_id | server-only: target_id |
| `get_project_info` | MATCH |  |  |
| `get_task_view` | MATCH |  |  |
| `get_tool` | DIFF | orig-only: step_indices,studio_id,version | server-only: tool_id |
| `get_tool_run` | DIFF | orig-only: task_id,tool_id | server-only: run_id |
| `get_tool_version` | DIFF | orig-only: version_id | server-only: tool_id,version |
| `get_transformation` | MATCH |  |  |
| `get_transformation_requirements` | MATCH |  |  |
| `get_trigger` | DIFF | orig-only: end_date,start_date,timezone |  |
| `get_workforce` | DIFF | orig-only: version |  |
| `get_workforce_task_messages` | DIFF | orig-only: cursor,final_message_only,page_size,scope,workforce_id |  |
| `get_workforce_task_metadata` | DIFF | orig-only: workforce_id |  |
| `import_knowledge_file` | DIFF | orig-only: file_name,file_url,path,sheet,wait_seconds | server-only: file_path |
| `list_agent_task_messages` | DIFF | orig-only: agent_id,cursor,page_size,scope |  |
| `list_agent_tasks` | DIFF | orig-only: page,page_size | server-only: limit,status |
| `list_agent_triggers` | MATCH |  |  |
| `list_agent_versions` | DIFF | orig-only: detail,page,page_size |  |
| `list_agents` | DIFF | orig-only: page,page_size | server-only: cursor,folder_id,limit |
| `list_alarms` | DIFF | orig-only: page,page_size,resource_id,resource_type,search | server-only: target_id |
| `list_bulk_runs` | DIFF | orig-only: after,page_size,resource_id,resource_type,statuses | server-only: target_id |
| `list_conversations` | MATCH |  |  |
| `list_decision_models` | MATCH |  |  |
| `list_eval_batches` | DIFF | orig-only: page,page_size,resource_id,resource_type,search | server-only: test_set_id |
| `list_eval_checks` | DIFF | orig-only: resource_id,resource_type | server-only: target_id |
| `list_eval_runs` | DIFF | orig-only: detail,eval_batch_id,page,page_size,resource_id,resource_type | server-only: batch_id |
| `list_eval_test_cases` | DIFF | orig-only: page,page_size,resource_id,resource_type,search |  |
| `list_eval_test_sets` | DIFF | orig-only: page,page_size,resource_id,resource_type,search | server-only: target_id |
| `list_folders` | DIFF | orig-only: folder_type |  |
| `list_integration_providers` | DIFF | orig-only: query |  |
| `list_knowledge_rows` | DIFF | orig-only: page,page_size | server-only: limit,offset |
| `list_knowledge_sets` | DIFF | orig-only: filters,page,page_size |  |
| `list_llm_models` | DIFF | orig-only: model_subset,page,page_size,query |  |
| `list_oauth_accounts` | DIFF | orig-only: detail |  |
| `list_performance_dashboard_runs` | DIFF | orig-only: check_ids,config_id,detail,end_date,failed_only,page,page_size,resource_id,resource_type,start_date | server-only: dashboard_id,limit |
| `list_performance_dashboards` | DIFF | orig-only: resource_id,resource_type | server-only: target_id |
| `list_project_mcp_server_tools` | DIFF | orig-only: include_schemas,mcp_server_config_id | server-only: server_name |
| `list_project_mcp_servers` | MATCH |  |  |
| `list_resource_task_priorities` | MATCH |  |  |
| `list_slack_channels` | DIFF | orig-only: channel_type,oauth_account_id,search_query | server-only: limit |
| `list_tasks` | DIFF | orig-only: agent_id,date_range,page,page_size,search,states,view | server-only: limit,status |
| `list_tool_runs` | DIFF | orig-only: page,page_size | server-only: limit |
| `list_tool_versions` | DIFF | orig-only: detail,page_size |  |
| `list_tools` | DIFF | orig-only: page,page_size | server-only: folder_id,limit |
| `list_transformations` | DIFF | orig-only: category,integration,search,source,use_case | server-only: query |
| `list_trigger_statuses` | DIFF | orig-only: agent_id,page,page_size,search,workforce_id | server-only: target_id |
| `list_workforce_tasks` | DIFF | orig-only: cursor,date_range,page_size,status_filter | server-only: limit |
| `list_workforce_versions` | DIFF | orig-only: detail,page,page_size |  |
| `list_workforces` | DIFF | orig-only: page,page_size | server-only: folder_id,query |
| `move_tool_step` | DIFF | orig-only: from_index,studio_id,to_index | server-only: position,step_name,tool_id |
| `poll_agent_result` | DIFF | orig-only: agent_id,conversation_id,wait_seconds | server-only: task_id |
| `poll_eval_batch_result` | DIFF | orig-only: eval_batch_id,resource_id,resource_type,wait_seconds | server-only: batch_id |
| `poll_pre_publish_check` | DIFF | orig-only: check_id,resource_id,resource_type,wait_seconds | server-only: target_id |
| `poll_tool_result` | DIFF | orig-only: job_id,studio_id,wait_seconds | server-only: run_id |
| `poll_workforce_task_result` | DIFF | orig-only: wait_seconds,workforce_id |  |
| `publish_agent` | DIFF | orig-only: skip_checks,version_description,version_name | server-only: note |
| `publish_tool` | DIFF | orig-only: version_description,version_name | server-only: note |
| `publish_workforce` | DIFF | orig-only: skip_checks,version_description,version_name | server-only: note |
| `read_agent_system_prompt` | DIFF | orig-only: limit_lines,offset_line,variable,version |  |
| `remove_eval_test_case_rule` | DIFF | orig-only: check_id,resource_id,resource_type | server-only: index |
| `remove_performance_dashboard_rule` | DIFF | orig-only: check_id,config_id,resource_id,resource_type | server-only: dashboard_id,index |
| `remove_tool_step` | DIFF | orig-only: step_index,studio_id | server-only: step_name,tool_id |
| `restore_agent_version` | DIFF | orig-only: version_id | server-only: agent_id,version |
| `restore_tool_version` | DIFF | orig-only: version_id | server-only: tool_id,version |
| `restore_workforce_version` | MATCH |  |  |
| `run_evaluation` | DIFF | orig-only: evaluation_run_name,resource_id,resource_type,scenario_ids,task_ids,tool_simulation_config,version_id |  |
| `run_tool` | DIFF | orig-only: studio_id,version | server-only: tool_id |
| `run_transformation` | MATCH |  |  |
| `search_agent_system_prompt` | DIFF | orig-only: context,ignore_case,variable,version |  |
| `search_marketplace_listings` | MATCH |  |  |
| `search_public_tools` | DIFF | orig-only: categories,curated_only,page_size |  |
| `set_eval_test_case_simulation_config` | DIFF | orig-only: resource_id,resource_type,tool_simulation_config | server-only: config |
| `set_resource_task_priority` | DIFF | orig-only: priority_tier,resource_id,resource_type | server-only: priority,target_id |
| `set_tool_output` | DIFF | orig-only: output_schema,studio_id | server-only: tool_id |
| `start_bulk_run` | DIFF | orig-only: active_week_days,end_of_workday,interval,max_tasks,name,resource_id,resource_type,start_of_workday,time_zone | server-only: concurrency,items,target_id,target_type |
| `submit_agent_task_decisions` | DIFF | orig-only: agent_id |  |
| `submit_feedback` | DIFF | orig-only: agent_id,category,conversation_id,message,severity,skill_or_tool,title | server-only: comment,rating,target_id |
| `trigger_agent` | DIFF | orig-only: live_action_ids,simulate,version | server-only: timeout_seconds |
| `trigger_tool` | DIFF | orig-only: rerun_task_id,studio_id,version | server-only: tool_id |
| `trigger_workforce` | DIFF | orig-only: live_action_ids,params,simulate,version | server-only: wait |
| `unset_resource_task_priority` | DIFF | orig-only: resource_id,resource_type | server-only: target_id |
| `update_agent` | DIFF | orig-only: patch,version_description,version_name | server-only: description,knowledge_ids,model,name,settings,system_prompt |
| `update_agent_action` | DIFF | orig-only: chain_id,patch | server-only: approval_mode,description,max_calls,tool_id |
| `update_agent_mcp_server_approvals` | DIFF | orig-only: default_tool_approval,mcp_server_config_id,tool_approval_overrides | server-only: approvals,server_name |
| `update_agent_metadata_fields` | MATCH |  |  |
| `update_agent_version` | MATCH |  |  |
| `update_alarm` | DIFF | orig-only: auto_diagnose,channels,condition_config,cooldown_minutes,resource_id,resource_type,skip_recovery_alert,source_config,trigger_id,type | server-only: comparison,threshold,window_hours |
| `update_bulk_run_status` | MATCH |  |  |
| `update_eval_alarm` | MATCH |  |  |
| `update_eval_check` | DIFF | orig-only: check_config,resource_id,resource_type | server-only: rubric,type,value |
| `update_eval_test_case` | DIFF | orig-only: resource_id,resource_type | server-only: expected,input |
| `update_eval_test_set` | DIFF | orig-only: resource_id,resource_type,tool_simulation_config | server-only: description |
| `update_knowledge_rows` | DIFF | orig-only: updates | server-only: rows |
| `update_knowledge_set` | DIFF | orig-only: updates | server-only: columns,description |
| `update_performance_dashboard` | DIFF | orig-only: config_id,enabled,evaluation_delay_minutes,resource_id,resource_type,sample_rate,task_status | server-only: dashboard_id,description |
| `update_tool` | DIFF | orig-only: emoji,params_schema,params_to_remove,prompt_description,state_mapping,studio_id,title,version_description,version_name | server-only: inputs,name,output,tool_id |
| `update_tool_step` | DIFF | orig-only: patch,step_index,studio_id | server-only: params,step_name,tool_id |
| `update_tool_steps` | DIFF | orig-only: ops,output,output_schema,studio_id | server-only: steps,tool_id |
| `update_tool_version` | DIFF | orig-only: version_description,version_id,version_name | server-only: note,version |
| `update_trigger_status` | DIFF | orig-only: agent_id,status | server-only: enabled |
| `update_workforce` | DIFF | orig-only: agents,conditions,remove_edge_ids,remove_node_ids,tidy_up_graph,tools,triggers,version_description,version_name,workforce_graph,workforce_metadata | server-only: description,name,nodes |
| `update_workforce_trigger_status` | DIFF | orig-only: status,trigger_group_id | server-only: enabled,trigger_id |
| `update_workforce_version` | MATCH |  |  |
| `upsert_folder` | DIFF | orig-only: folder_type,items,parent_folder_id | server-only: parent_id |
| `upsert_pre_publish_config` | DIFF | orig-only: resource_id,resource_type,test_sets | server-only: min_pass_rate,target_id,test_set_id |

## Original-shaped calls that fail server validation

An original-shaped call sends the original catalog's parameter names. The server ignores unknown names, so a call fails only when the server requires a parameter the original call cannot supply.

| Tool | Server-required params an original call does not supply |
|---|---|
| `add_eval_test_case_rule` | rule |
| `add_performance_dashboard_rule` | rule |
| `check_api_key_availability` | keys |
| `check_tool_integration_requirements` | tool_id |
| `clone_public_tool` | template_id |
| `create_alarm` | metric, threshold |
| `create_eval_check` | type |
| `create_knowledge_set` | name |
| `create_tool` | name |
| `create_trigger` | target_id, target_type, type |
| `edit_agent_system_prompt` | new_string, old_string |
| `export_knowledge` | file_path |
| `get_agent_version` | agent_id, version |
| `get_tool_version` | tool_id, version |
| `import_knowledge_file` | file_path |
| `move_tool_step` | position, step_name |
| `remove_eval_test_case_rule` | index |
| `remove_performance_dashboard_rule` | index |
| `remove_tool_step` | step_name |
| `restore_agent_version` | agent_id, version |
| `restore_tool_version` | tool_id, version |
| `set_eval_test_case_simulation_config` | config |
| `start_bulk_run` | target_type |
| `submit_feedback` | target_id |
| `update_agent_mcp_server_approvals` | approvals |
| `update_knowledge_rows` | rows |
| `update_tool_step` | params, step_name |
| `update_tool_steps` | steps |
| `update_tool_version` | note, version |
| `update_trigger_status` | enabled |
| `update_workforce_trigger_status` | enabled |
| `upsert_pre_publish_config` | test_set_id |
