FROM daptin/daptin
ADD callup_daptin.yaml /opt/daptin/schema_callup_daptin.yaml
ADD intent-trainer/dist /opt/site/intent-trainer