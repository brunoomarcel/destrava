# Deploy automático na HostGator

Este projeto é um frontend Vite. O workflow `.github/workflows/deploy-hostgator.yml` faz o build e envia a pasta `dist/` para a HostGator sempre que houver push na branch `main`.

## Configuração única

1. No cPanel da HostGator, crie ou confirme uma conta FTP com permissão para a pasta pública do domínio.
2. Copie os dados do servidor FTP no cPanel. Prefira FTPS explícito na porta `21`.
3. No GitHub, abra `Settings > Secrets and variables > Actions > New repository secret` e crie:

   - `HOSTGATOR_FTP_SERVER`: hostname FTP informado pela HostGator, por exemplo `ftp.seudominio.com`.
   - `HOSTGATOR_FTP_USERNAME`: usuário da conta FTP.
   - `HOSTGATOR_FTP_PASSWORD`: senha da conta FTP.
   - `HOSTGATOR_SERVER_DIR`: pasta remota do site, normalmente `/public_html/` para o domínio principal.

4. Faça um push na `main` ou execute o workflow manualmente em `Actions > Deploy para HostGator > Run workflow`.
5. Confira o log da etapa de FTP e abra o domínio em uma janela anônima.

## Atenção

- Para um domínio adicional, a pasta geralmente será algo como `/public_html/dominio.com/`; confirme o caminho exato no cPanel.
- Não coloque usuário, senha ou chaves FTP em arquivos do repositório.
- O workflow não apaga arquivos remotos que não estejam no build (`dangerous-clean-slate: false`).
- Se a HostGator não aceitar FTPS, altere `protocol: ftps` para `ftp` somente depois de confirmar essa limitação com o suporte.
