# Deploy automático na HostGator

Este projeto é um frontend Vite. O workflow `.github/workflows/deploy-hostgator.yml` faz o build e envia a pasta `dist/` para a HostGator sempre que houver push na branch `main`.

## Configuração única

1. No cPanel da HostGator, crie ou confirme uma conta FTP com permissão para a pasta pública do domínio.
2. Copie os dados do servidor FTP no cPanel. Prefira FTPS explícito na porta `21`.
3. No GitHub, abra `Settings > Secrets and variables > Actions` e crie as duas variáveis não sensíveis em `Variables`:

   - `HOSTGATOR_FTP_SERVER`: hostname FTP informado pela HostGator, por exemplo `ftp.seudominio.com`.
   - `HOSTGATOR_SERVER_DIR`: `destrava.lizandrasoares.com/` (pasta do document root exibida no Gerenciador de arquivos).
   - `SUPABASE_URL`: `https://hticokvahchyhcctjyhk.supabase.co`.
   - `SUPABASE_PUBLISHABLE_KEY`: chave pública `anon`/publishable do projeto Supabase.

   Depois, em `Secrets`, crie os dois valores sensíveis:

   - `HOSTGATOR_FTP_USERNAME`: usuário da conta FTP.
   - `HOSTGATOR_FTP_PASSWORD`: senha da conta FTP.

4. Faça um push na `main` ou execute o workflow manualmente em `Actions > Deploy para HostGator > Run workflow`.
5. Confira o log da etapa de FTP e abra o domínio em uma janela anônima.

## Atenção

- Para este subdomínio, use a pasta `destrava.lizandrasoares.com/`, conforme o document root exibido no cPanel.
- Se a conta FTP abrir diretamente dentro de `/home/grupocasaa24cd8e`, use `destrava.lizandrasoares.com/` sem `/home/...` no início.
- Não coloque usuário, senha ou chaves FTP em arquivos do repositório.
- O workflow não apaga arquivos remotos que não estejam no build (`dangerous-clean-slate: false`).

## Rastreamento de origem

O formulário salva a origem do primeiro acesso e os parâmetros UTM no Supabase. Antes de testar ou publicar, execute o bloco atualizado de `supabase/schema.sql` no SQL Editor do projeto.

- Bio orgânica: `https://destrava.casullione.com/org`
- Meta Ads: `https://destrava.casullione.com/?utm_source=meta&utm_medium=paid_social&utm_campaign=destrava_outubro&utm_content=criativo_01`

Os leads terão `traffic_source` como `organico`, `trafego-pago` ou `direto`, além de `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`, `landing_path` e `referrer`.
- Se a HostGator não aceitar FTPS, altere `protocol: ftps` para `ftp` somente depois de confirmar essa limitação com o suporte.
