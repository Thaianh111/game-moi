import base64,json
s=open('src.html').read()
for k,f in {'atlas':'atlas','props':'props','tileset':'tileset','clouds':'clouds','mountains':'mountains','trees':'trees','pangolin':'pangolin','swamp_back':'swamp_back','swamp_mid':'swamp_mid','fx_poof':'fx_poof','fx_smash':'fx_smash'}.items():
    s=s.replace('__%s__'%k,'data:image/png;base64,'+base64.b64encode(open('img/%s.png'%f,'rb').read()).decode())
s=s.replace('__atlasjson__',json.dumps(json.load(open('img/json/atlas.json'))).replace("'","\\'"))
s=s.replace('__propsjson__',json.dumps(json.load(open('img/json/atlas-props.json'))).replace("'","\\'"))
s=s.replace('__fxjson__',open('img/fx.json').read())
open('index.html','w').write(s);print(len(s))
